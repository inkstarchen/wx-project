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

  },
  lifetimes:{
    created() {
      this.setData({
        item:this.properties.item,
        'item.favor':false
      })
      const OpenId = wx.getStorageSync('OpenId');
      const db = wx.cloud.database();
      const collection = db.collection("User");
      collection.where({
        _openid: OpenId
      }).get({
        success: res => {
          if(this.data.item.Type == "Exam"){
            if (res.data[0].Exams.indexOf(this.data.item.FileName) != -1) {
              this.setData({
                'item.favor': true
              }, () => {
                console.log(this.data.item.favor);
              });
            }
          }else if(this.data.item.Type == 'Resource'){
            if (res.data[0].Resource.indexOf(this.data.item.FileName) != -1) {
              this.setData({
                'item.favor': true
              }, () => {
                console.log(this.data.item.favor);
              });
            }
          }else if(this.data.item.Type == 'Note'){
            if(res.data[0].Notes.indexOf(this.data.item.FileName) != -1) {
              this.setData({
                'item.favor':true
              },() => {
                console.log(this.data.item.favor);
              });
            }
          }
          
        }
      });
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
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