
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  toUpload:function(e){
    wx.navigateTo({
      url: '/pages/upload/upload?FileType=Note',
    })
  },
  onLoad(options) {
    this.setData({
      CourseName:options.CourseName
    })
  },
  onShow() {
    const db = wx.cloud.database();
    const Resource = db.collection("Resource");
    Resource.where({
      CourseName:this.data.CourseName,
      Type:'Note'
    }).get({
      success: res => {
        console.log(res.data);
        this.setData({
          Notes:res.data
        })
      },
      fail: err => {
        console.log("获取笔记失败",err);
      }
    })
},


})