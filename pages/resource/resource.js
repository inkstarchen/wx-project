
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  toUpload:function(e){
    wx.navigateTo({
      url: '/pages/upload/upload?FileType="Resource"',
    })
  },
  onLoad(options){
    this.setData({
      CourseName:options.CourseName
    });
    console.log(options.CourseName);
  },
  onShow(){
    const db = wx.cloud.database();
    const Resource = db.collection("Resource");
    Resource.where({
      CourseName:this.data.CourseName,
      Type:'Resource'
    }).get({
      success: res => {
        console.log(res.data);
        this.setData({
          resources:res.data
        })
        console.log(this.data.resources);
      },
      fail: err => {
        console.log("获取资料失败",err);
      }
    })
  },
})