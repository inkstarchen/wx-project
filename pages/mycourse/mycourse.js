// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    none:true,
    courses:[]
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const OpenId = wx.getStorageSync('OpenId');
    const db = wx.cloud.database();
    const User = db.collection('User');
    const Courses = db.collection('Courses');
    User.where({
      _openid:OpenId
    }).field({
      Courses:true,
    }).get({
      success: async res => {
        console.log(res.data[0]);
        let mycourses = res.data[0].Courses;
        let courses = [];
        for(let i = 0; i < mycourses.length; i++){
          try {
            const result = await Courses.where({
              Name: mycourses[i]
            }).get();
            console.log(result.data[0]);
            courses.push(result.data[0]);
            console.log(courses);
          } catch (err) {
            console.error("获取失败", err);
          }
        }
        console.log(courses);
        if(courses.length != 0){
          this.setData({
            courses: courses,
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