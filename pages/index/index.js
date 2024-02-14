import userList from "../../datas/userList.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notLogin:true,
    broads: [],
    broads2: [],
    User:{
      AvatarUrl:'../../images/个人头像.png',
      Name:'游客',
      OpenId:"",
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      broads: userList.latest1,
      broads2: userList.latest2
    });
    wx.setStorageSync('notLogin', true);
    wx.setStorageSync('OpenId', '0');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(options) {
    const OpenId = wx.getStorageSync('OpenId');
    if(OpenId != "0"){
      const db = wx.cloud.database();
      const User = db.collection('User');
      User.where({
        _openid: OpenId,
      }).get({
        success: res => {
          this.setData({
            User: res.data[0],
            notLogin:false,
          });
        },
        fail : err => {
        }
      })
    }else{
      this.setData({
        OpenId:"",
        notLogin:true,
        User:{
          AvatarUrl:'../../images/个人头像.png',
          Name:'用户',
          Info:"个人简介"
        },
      })
    }
  
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

  detail:function(){
    if(this.data.notLogin){
      wx.showModal({
        title:"警告",
        content:"你还未登录"
      })
    }else{
      console.log(this.data);
      wx.navigateTo({
        url:'/pages/detail/detail?UserName='+this.data.User.Name
      });
    }
  },


})
