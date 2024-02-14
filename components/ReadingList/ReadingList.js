// components/ReadingList.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    },
    index:{
      type:Number,
      value:0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    OpenId:'0',
    viewmore:false,
    item:{
    },
    itemList:[]
  },
  lifetimes:{
    attached(){
      this.setData({
        Block:'block'+this.properties.index,
        'item._id':this.properties.item._id,
        'item.favor':false,
        'item.Type':"Reading"
      });
      const db = wx.cloud.database();
      const openid = wx.getStorageSync('OpenId');
      if(openid != '0'){
        const User = db.collection('User');
        User.where({
          _openid: openid,
        }).get({
          success: res => {
            if(res.data[0].Readings.indexOf(this.data.item._id) != -1){
              this.setData({
                'item.favor':true,
              });
            }else{
            }
          },
          fail: err => {
            console.log(err);
          }
        })
        console.log(this.data.Block);
        this.setData({
          OpenId:openid,
          lines:this.properties.item.Lines.split("\n")
      })
      let text = this.data.item.favor?'取消收藏':'收藏';
      this.setData({
        itemList:[
          text,
          '删除文件'
        ]
      })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    more:function(){
      wx.showActionSheet({
        itemList: this.data.itemList,
        success: res  =>{
          if(res.tapIndex == 0){
            const db = wx.cloud.database();
            const User = db.collection('User');
            if(this.data.item.favor){
              this.setData({
                'item.favor':false
              });
              User.where({
                _openid:this.data.OpenId
              }).get({
                success: res => {
                  let Readings = res.data[0].Readings;
                  let id = res.data[0]._id;
                  let index = Readings.indexOf(this.data.item._id);
                  Readings.splice(index,1);
                  User.doc(id).update({
                    data:{
                      Readings:Readings,
                    }
                  });
                }
              })
            }else{
              this.setData({
                'item.favor':true,
              });
              User.where({
                _openid:this.data.OpenId,
              }).get({
                success: res => {
                  let Readings = res.data[0].Readings;
                  let id = res.data[0]._id;
                  Readings.push(this.data.item._id);
                  User.doc(id).update({
                    data:{
                      Readings:Readings,
                    }
                  })
                }
              })
            }
            let text = this.data.item.favor?'取消收藏':'收藏';
              this.setData({
                itemList:[
                  text,
                  '删除',
                ]
              });
          }else if(res.tapIndex == 1){
            let OpenId = this.data.OpenId;
            const db = wx.cloud.database();
            const Reading = db.collection('Reading');
            Reading.where({
              _id:this.data.item._id,
            }).get({
              success: res => {
                if(res.data[0]._openid == OpenId){
                  db.collection('User').get({
                    success:result =>{
                      for(let i = 0 ; i < result.data.length ; i++){
                        let id = result.data[i]._id;
                        let Readings = result.data[i].Readings;
                        let index = Readings.indexOf(this.data.item._id);
                        if(index != -1){
                          Readings.splice(index,1);
                          db.collection('User').doc(id).update({
                            data:{
                              Readings:Readings,
                            }
                          });
                        }
                      }
                    }
                  });
                  wx.cloud.deleteFile({
                    fileList:['cloud://cloud1-1gbl7ldm505fd1a8.636c-cloud1-1gbl7ldm505fd1a8-1323972207/'+this.data.item.FileId],
                    success:res => {
                      wx.showToast({
                        title: '文件删除成功',
                      });
                    }
                  });
                  Reading.doc(this.data.item._id).remove({
                    success: res => {
                      wx.showToast({
                        title: '删除成功',
                      });
                    }
                  })
                }else{
                  wx.showModal({
                    title: '警告',
                    content: '你没有删除此文件的权限',
                  })
                }
              }
            })
          }
        }
      })
    },
    viewmore:function(){
      if(this.data.viewmore){
        this.setData({
          viewmore:false
        })
      }else{
        this.setData({
          viewmore:true
        })
      }

    }
  }
})