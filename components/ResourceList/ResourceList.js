// components/testList/testList.js
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
    OpenId:'0',
    path:'/images/资料.svg',
  },
  lifetimes:{
    ready() {
      this.setData({
        item:this.properties.item,
        'item.favor':false
      })
      let File = this.data.item.FileId;
      let suffix = '';
      for(let i = File.length-1; File[i] != '.'; i-- ){
        suffix =File[i] + suffix;
      }
      if(suffix == 'pptx' || suffix == 'ppt'){
        this.setData({
          path:'/images/ppt.svg'
        })
      }else if(suffix == 'doc' || suffix == 'docx'){
        this.setData({
          path:'/images/word.svg'
        })
      }
      const OpenId = wx.getStorageSync('OpenId');
      if(OpenId){
        this.setData({
          OpenId:OpenId
        })
      }
      const db = wx.cloud.database();
      const collection = db.collection("User");
      collection.where({
        _openid: OpenId
      }).get({
        success: res => {
          if(this.data.item.Type == "Exam"){
            if (res.data[0].Exams.indexOf(this.data.item._id) != -1) {
              this.setData({
                'item.favor': true
              });
            }
          }else if(this.data.item.Type == 'Resource'){
            if (res.data[0].Resource.indexOf(this.data.item._id) != -1) {
              this.setData({
                'item.favor': true
              });
            }
          }else if(this.data.item.Type == 'Note'){
            if(res.data[0].Notes.indexOf(this.data.item._id) != -1) {
              this.setData({
                'item.favor':true
              });
            }
          }
          let text = this.data.item.favor?'取消收藏':'收藏';
              this.setData({
                itemList:[
                  text,
                  '删除文件'
                ]
              }) 
        }
      });


      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    more:function(){
      console.log(this.data.item);
      wx.showActionSheet({
        itemList:this.data.itemList,
        success: res => {
          if(res.tapIndex == 0){
            console.log('1')
            const OpenId = wx.getStorageSync('OpenId');
            const db = wx.cloud.database();
            const collection = db.collection("User");
            if(this.data.item.favor){
            this.setData({
              'item.favor':false
            });
            let text = this.data.item.favor?'取消收藏':'收藏';
              this.setData({
                itemList:[
                  text,
                  '删除文件'
                ]
              })
            collection.where({
              _openid:OpenId
            }).get({
                success: res => {
                if(this.data.item.Type == 'Exam'){
                  let Exams = res.data[0].Exams;
                  let index = Exams.indexOf(this.data._id);
                  Exams.splice(index,1);
                  console.log(res.data[0]._id);
                  collection.doc(res.data[0]._id).update({
                   data:{
                    Exams:Exams
                    }
                })
                console.log(res.data[0]._id);
            }else if(this.data.item.Type == 'Resource'){
              let Resources = res.data[0].Resource;
              let index = Resources.indexOf(this.data._id);
              Resources.splice(index,1);
              console.log(res.data[0]._id);
              collection.doc(res.data[0]._id).update({
                data:{
                  Resource:Resources
                }
              });
            }else if(this.data.item.Type == 'Note'){
              let Notes = res.data[0].Notes;
              let index = Notes.indexOf(this.data._id);
              Notes.splice(index,1);
              console.log(res.data[0]._id);
              collection.doc(res.data[0]._id).update({
                data:{
                  Notes:Notes
                }
              });
              
            }else if(this.data.item.Type == 'Reading'){
              let Readings = res.data[0].Readings;
              let index = Readings.indexOf(this.data.item._id);
              Readings.splice(index,1);
              console.log(res.data[0]._id);
              collection.doc(res.data[0]._id).update({
                data:{
                  Readings:Readings
                }
              });
            } else{
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
             let text = this.data.item.favor?'取消收藏':'收藏';
              this.setData({
                itemList:[
                  text,
                  '删除文件'
                ]
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
                _id:this.data.item._id
              }).get({
                success: result => {
                  Exams.push(result.data[0]._id);
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
                _id:this.data.item._id
              }).get({
                success: result => {
                  Resources.push(result.data[0]._id);
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
                _id:this.data.item._id
              }).get({
                success: result => {
                  Notes.push(result.data[0]._id);
                  collection.doc(id).update({
                    data:{
                      Notes:Notes
                    }
                  });
                }
              })
            }else if(this.data.item.Type == 'Reading'){
              let Readings = res.data[0].Readings;
              let id = res.data[0]._id;
              const Reading = db.collection("Reading");
              Reading.where({
                _id:this.data.item._id
              }).get({
                success: result => {
                  Readings.push(result.data[0]._id);
                  collection.doc(id).update({
                    data:{
                      Readings:Readings
                    }
                  });
                }
              })
            } else{
              let Courses = res.data[0].Courses;
              let id = res.data[0]._id;
              Courses.push(this.data.item.CourseName);
                  collection.doc(id).update({
                    data:{
                      Courses:Courses
                    }
                  });
            }
          }
        });
      }
          }else if(res.tapIndex == 1){
            let id = this.data.item._id;
            if(this.data.item._openid == this.data.OpenId){
              wx.cloud.database().collection('User').get({
                success:res => {
                  console.log(this.data.item.Type)
                  if(this.data.item.Type == 'Exam'){
                    console.log(res.data)
                    for(let i = 0; i< res.data.length; i++){
                      let id = res.data[i]._id;
                      let List = res.data[i].Exams;
                      let index = List.indexOf(this.data.item._id);
                      console.log(index)
                      if(index != -1){
                        List.splice(index,1);
                        wx.cloud.database().collection('User').doc(id).update({
                          data:{
                            Exams:List
                          }
                        });
                      }
                    }
                  }else if(this.data.item.Type == 'Resource'){
                    for(let i = 0; i< res.data.length; i++){
                      let id = res.data[i]._id;
                      let List = res.data[i].Resource;
                      let index = List.indexOf(this.data.item._id);
                      if(index != -1){
                        List.splice(index,1);
                        wx.cloud.database().collection('User').doc(id).update({
                          data:{
                            Resource:List
                          }
                        });
                      }
                    }
                  }else if(this.data.item.Type == 'Note'){
                    for(let i = 0; i< res.data.length; i++){
                      let id = res.data[i]._id;
                      let List = res.data[i].Notes;
                      let index = List.indexOf(this.data.item._id);
                      if(index != -1){
                        List.splice(index,1);
                        wx.cloud.database().collection('User').doc(id).update({
                          data:{
                            Notes:List
                          }
                        });
                      }
                    }
                  }
                }
              })
              wx.cloud.deleteFile({
                fileList:['cloud://cloud1-1gbl7ldm505fd1a8.636c-cloud1-1gbl7ldm505fd1a8-1323972207/'+this.data.item.FileId],
                success:res => {
                  wx.showToast({
                    title: '文件删除成功',
                  });
                },
                fail: err => {
                  console.log(err);
                }
              })
              wx.cloud.database().collection('Resource').doc(id).remove({
                success: res =>{
                  wx.showToast({
                    title: '文件删除成功',
                  });
                },
                fail: err => {
                  console.log(err);
                }
              })
            }else{
              wx.showModal({
                title: '警告',
                content: '你没有删除此文件的权限',
              })
            } 
          }
        }
      });
    },
    OpenFile: function () {
      console.log(this.properties.item.FileId);
      wx.cloud.downloadFile({
        fileID: 'cloud://cloud1-1gbl7ldm505fd1a8.636c-cloud1-1gbl7ldm505fd1a8-1323972207/'+this.properties.item.FileId, // 文件的远程地址
        success: function (res) {
          if (res.statusCode === 200) {
            const tempFilePath = res.tempFilePath;
            const fs = wx.getFileSystemManager();
            fs.saveFile({
              tempFilePath: tempFilePath,
              success: function (res) {
                const savedFilePath = res.savedFilePath;
                console.log(savedFilePath);
                wx.openDocument({
                  filePath: res.savedFilePath,
                  showMenu:true
                })
              }
            })
          } else {
            console.error('文件下载失败，HTTP状态码：', res.statusCode);
          }
        },
        fail: function (err) {
          console.error('文件下载失败：', err);
        }
      });
    },
  }
})