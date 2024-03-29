
Page({

  /**
   * 页面的初始数据
   */
  data: {
    none:true,
    Exams:[]
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const OpenId = wx.getStorageSync('OpenId');
    const db = wx.cloud.database();
    const User = db.collection('User');
    const Resource = db.collection('Resource');
    User.where({
      _openid:OpenId
    }).get({
      success: async res => {
        console.log(res.data[0]);
        let myExams = res.data[0].Exams;
        let Exams = [];
        for(let i = 0; i < myExams.length; i++){
          try {
            const result = await Resource.where({
              _id: myExams[i]
            }).get();
            console.log(result.data[0]);
            Exams.push(result.data[0]);
          } catch (err) {
            console.error("获取失败", err);
          }
        }
        console.log(Exams);
        if(Exams.length != 0){
          this.setData({
            Exams:Exams,
            none:false,
          });
        } 
      },
      fail: err =>{
        console.error("获取失败",err);
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

  },
})