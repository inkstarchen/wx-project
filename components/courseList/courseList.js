// components/courseList/courseList.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    OpenId:"",
    item:{
      type:Object,
      value:{}
    }
  },
  lifetimes:{
    ready() {
      this.setData({
        item:this.properties.item,
        'item.favor':false
      })
      const OpenId = wx.getStorageSync('OpenId');
        this.setData({
          OpenId:OpenId
        })
      console.log(this.data.OpenId);
      const db = wx.cloud.database();
      const collection = db.collection("User");
      collection.where({
        _openid: OpenId
      }).get({
        success: res => {
          console.log(this.data.item);
          if (res.data[0].Courses.indexOf(this.data.item.Name) !== -1) {
            this.setData({
              'item.favor': true
            });
            
          }
          let text = this.data.item.favor?'取消收藏':'收藏';
          this.setData({
            itemList:[
              text,
              '删除'
            ]
          });
        }
      });

      wx.cloud.downloadFile({
        fileID: this.data.item.FileId,
        success: result => {
          this.setData({
            'item.FileId':result.tempFilePath
          })
        },
        fail: res => {},
      })
    }
  },
  
  
  
  /**
   * 组件的初始数据
   */
  data: {
    OpenId:'0',
    touch:false,
    item:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchstart:function(){
      this.setData({
        touch:true,
      });
    },
    touchend:function(){
      this.setData({
        touch:false,
      });
    },
    to_course: function(e) {
      wx.navigateTo({
        url: '/pages/course/course?CourseName='+this.data.item.Name,
      })
  },
  more:function(){
      console.log(this.data.item);
      wx.showActionSheet({
        itemList:this.data.itemList,
        success: res => {
          if(res.tapIndex == 0){
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
                  '删除'
                ]
              })
            collection.where({
              _openid:OpenId
            }).get({
                success: res => {
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
              });
            }else{
              this.setData({
                'item.favor':true
             })
             let text = this.data.item.favor?'取消收藏':'收藏';
              this.setData({
                itemList:[
                  text,
                  '删除'
                ]
              })
              collection.where({
                _openid:OpenId
        }).get({
          success: res => {
              let Courses = res.data[0].Courses;
              let id = res.data[0]._id;
              Courses.push(this.data.item.Name);
                  collection.doc(id).update({
                    data:{
                      Courses:Courses
                    }
                  });
          }
        });
      }
          }else if(res.tapIndex == 1){
            if(this.data.item._openid == this.data.OpenId){
              wx.cloud.database().collection('User').get({
                success:res => {
                  console.log(this.data.item.Type)
                    for(let i = 0; i< res.data.length; i++){
                      let id = res.data[i]._id;
                      let List = res.data[i].Courses;
                      let index = List.indexOf(this.data.item.Name);
                      if(index != -1){
                        List.splice(index,1);
                        wx.cloud.database().collection('User').doc(id).update({
                          data:{
                            Courses:List
                          }
                        });
                      }
                  }
                }
              })
              let FileId = this.data.item.FileId;
              FileId = FileId.slice(11);
              console.log(FileId);
              wx.cloud.deleteFile({
                fileList:['cloud://cloud1-1gbl7ldm505fd1a8.636c-cloud1-1gbl7ldm505fd1a8-1323972207/'+FileId],
                success:res => {
                  wx.showToast({
                    title: '文件删除成功',
                  });
                },
                fail: err => {
                  console.log(err);
                }
              })
              wx.cloud.database().collection('Courses').doc(this.data.item._id).remove({
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
  }
})