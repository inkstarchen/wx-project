Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchTerm:"",
    courses:[]
  },
  getValue: function (e) {
    this.setData({
      searchTerm: e.detail.value
    })
    let searchItem = e.detail.value
    const db = wx.cloud.database()
    const collection = db.collection("Courses")
    collection.where({
      Name: db.RegExp({
        regexp: searchItem,
        options: 'i'  // 表示不区分大小写
      })
    }).get({
      success: res => {
        console.log(res.data)
        const OpenId = wx.getStorageSync('OpenId');
        const User = db.collection('User');
        console.log('123');
        this.setData({
          courses: res.data
        });
        if(OpenId != ''){
          User.where({
            _openid: OpenId
          }).get({
            success: res2 => {
              const Courses = res.data.map(course => ({
                ...course,
                favor: res2.data[0].Courses.indexOf(course.Name) !== -1
              }));
              this.setData({
                courses: Courses
              });
            }
          });
        }
      },
      fail: err => {
        console.error("查询失败", err)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
  add(){
    wx.navigateTo({
      url: '/pages/addcourse/addcourse',
    })
      },
})