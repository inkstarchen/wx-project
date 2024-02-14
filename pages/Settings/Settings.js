// pages/Settings/Settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notLogin:true,
    touch:false,
  },
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      const notLogin = wx.getStorageSync('notLogin');
      if(notLogin){
        this.setData({
          notLogin:notLogin
        })
      }
  },
  login:function(){
    wx.setStorageSync('notLogin', false)
    wx.cloud.callFunction({
      name:"quickstartFunctions",
      data:{
        type:"getOpenId",
      },
      complete: res =>{
        const OpenId = res.result.userInfo.openId;
        wx.setStorageSync('OpenId',OpenId);
        const db = wx.cloud.database();
        const User = db.collection('User');
        User.where({
          _openid:OpenId,
        }).get({
          success: res => {
            if(res.data.length != 0){
            this.setData({
              notLogin:false,
              User:res.data[0],
            })
            wx.cloud.downloadFile({
              fileID:"cloud://cloud1-1gbl7ldm505fd1a8.636c-cloud1-1gbl7ldm505fd1a8-1323972207/test/"+this.data.User.AvatarUrl.slice(11),
            });
            wx.showToast({
              title: '账号登录成功',
            })
            }else{
                  this.setData({
                    notLogin:false
                  });
                  db.collection('User').add({
                    data:{
                      AvatarUrl:"cloud://cloud1-1gbl7ldm505fd1a8.636c-cloud1-1gbl7ldm505fd1a8-1323972207/系统图片/个人头像.png",
                      Courses:[],
                      Name:'用户',
                      Exams:[],
                      Notes:[],
                      Readings:[],
                      Resource:[],
                    }
                  });
                  wx.navigateTo({
                    url: '/pages/detail/detail',
                  });
            }
          }
        });
      }
    });
  },

  logout:function(){
    wx.setStorageSync('notLogin', true);
    wx.removeStorageSync('OpenId');
    this.setData({
      OpenId:"",
      notLogin:true,
    })
    wx.showToast({
      title: '账号注销成功',
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