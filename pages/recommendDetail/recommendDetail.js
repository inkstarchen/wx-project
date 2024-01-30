// pages/recommendDetail/recommendDetail.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendName:"",
    recommend:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.recommendName);
    this.setData({
      exam:db.collection("Reading").where({
        Name:this.data.recommendName
      })
    })
  },

  download:function(e){
    wx.cloud.downloadFile({
      fileId:this.data.recommend.FileId,
      success:res=>{
        console.log(res.tempFilePath)
      },
      fail:err=>{

      }
    })
  },

  open:function(e){
    wx.openDocument({
      filePath: this.data.recommend.FileId,
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