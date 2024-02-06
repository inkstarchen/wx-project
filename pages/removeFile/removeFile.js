// pages/removeFile/removeFile.js
const db=wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    options:[]
  },
  change:function(e){
    this.setData({
      options:e.detail.value
    })
  },
  submitForm:function(e){
    for(var i=0;i<this.data.options.length;i++){
      db.collection("Resource").doc(items[i]._id).remove({
        success:function(res){
          console.log(res.data)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      CourseName:options.CourseName,
      FileType:options.FileType
    }),
    console.log(this.data.CourseName)
    console.log(this.data.FileType)
    db.collection("Resource").where(
      {
        CourseName:this.data.CourseName
      },
      {
        FileType:this.data.FileType
      }
    ).get({
      success:res=>{
        this.setData({
          items:res.data
        })
        console.log(this.data.items)
      },
      fail: err => {
        console.error("获取数据失败", err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})