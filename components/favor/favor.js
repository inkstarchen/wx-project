
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    item:{
    },
  },
  lifetimes:{
    created(){ 
      this.setData({
        item:this.properties.item
      });
      console.log(this.data.item);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    click:function(){
      const OpenId = wx.getStorageSync('OpenId');
      const db = wx.cloud.database();
      const collection = db.collection("User");
      if(this.data.item.favor){
        this.setData({
          'item.favor':false
        });
        collection.where({
        _openid:OpenId
        }).get({
          success: res => {
            if(this.data.item.Type == 'Exam'){
              let Exams = res.data[0].Exams;
              let index = Exams.indexOf(this.data.FileName);
              Exams.splice(index,1);
              console.log(res.data[0]._id);
              collection.doc(res.data[0]._id).update({
                data:{
                  Exams:Exams
                }
              })
            }else if(this.data.item.Type == 'Resource'){
              let Resources = res.data[0].Resource;
              let index = Resources.indexOf(this.data.FileName);
              Exams.splice(index,1);
              console.log(res.data[0]._id);
              collection.doc(res.data[0]._id).update({
                data:{
                  Resource:Resources
                }
              });
            }else if(this.data.item.Type == 'Note'){
              let Notes = res.data[0].Notes;
              let index = Notes.indexOf(this.data.FileName);
              Notes.splice(index,1);
              console.log(res.data[0]._id);
              collection.doc(res.data[0]._id).update({
                data:{
                  Notes:Notes
                }
              });
            }else{
              let Courses = res.data[0].Courses;
              let index = Courses.indexOf(this.data.item.Name);
              Courses.splice(index,1);
              console.log(res.data[0]._id);
              collection.doc(res.data[0]._id).update({
              data:{
                Courses:Courses
              }
            })
            }
            
          }
        });
      }else{
        this.setData({
          'item.favor':true
        })
        collection.where({
          _openid:OpenId
        }).get({
          success: res => {
            if(this.data.item.Type == "Exam"){
              let Exams = res.data[0].Exams;
              let id = res.data[0]._id;
              const Resource = db.collection("Resource");
              Resource.where({
                FileName:this.data.item.FileName
              }).get({
                success: result => {
                  Exams.push(result.data[0].FileName);
                  console.log(Exams);
                  console.log(id);
                  collection.doc(id).update({
                    data:{
                      Exams:Exams
                    }
                  });
                }
              })
            }else if(this.data.item.Type == 'Resource'){
              let Resources = res.data[0].Resource;
              let id = res.data[0]._id;
              const Resource = db.collection("Resource");
              Resource.where({
                FileName:this.data.item.FileName
              }).get({
                success: result => {
                  Resources.push(result.data[0].FileName);
                  collection.doc(id).update({
                    data:{
                      Resource:Resources
                    }
                  });
                }
              })
            }else if(this.data.item.Type == 'Note'){
              let Notes = res.data[0].Notes;
              let id = res.data[0]._id;
              const Resource = db.collection("Resource");
              Resource.where({
                FileName:this.data.item.FileName
              }).get({
                success: result => {
                  Notes.push(result.data[0].FileName);
                  collection.doc(id).update({
                    data:{
                      Notes:Notes
                    }
                  });
                }
              })
            } else{
              let Courses = res.data[0].Courses;
              let id = res.data[0]._id;
              const Course = db.collection("Courses");
              Course.where({
                Name:this.data.item.Name
              }).get({
                success: result => {
                  Courses.push(result.data[0].Name);
                  collection.doc(id).update({
                    data:{
                      Courses:Courses
                    }
                  });
                }
              });
            }
           
          }
        });
      }
  }
}
})