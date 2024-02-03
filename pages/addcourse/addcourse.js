const db = wx.cloud.database()//全局变量放在page外面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderImage:"",
    orderText:"",
    showImage_url: '',
    "Name":"",
    "Info":""
  },

  formsubmit: function(e) {
    this.setData({
      orderImage: e.detail.value.orderImage
    })
    const wxreq = wx.request({
      url: 'cloud://cloud1-1gbl7ldm505fd1a8.636c-cloud1-1gbl7ldm505fd1a8-1323972207/课程',//后台接口路径
      data: {
        'orderImage': this.data.showImage_url
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      header: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Cookie': 'SESSION=' + wx.getStorageSync("sessionId")
      }, // 设置请求的 header 
      success: function (res) {
        console.log("提交任务成功");
        wx.navigateTo({//页面跳转
          url: '/pages/search/search',
        })
        wx.showModal({//提示弹框
          title: '提示',
          content: '提交成功，请耐心等待审核。',
          showCancel: false, //是否显示取消按钮 
          fail: function (res) { }, //接口调用失败的回调函数
          complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
        })
      },
      fail: function () {
        console.log("请求数据失败");
      }
    })
    
  },

  bindSubmit:function(res){
    console.log(res)
    
    var Name = res.detail.value.Name
    var Info = res.detail.value.Info
   

    db.collection("Courses").add({
      data: {
        "Name":Name,
        "Info":Info
      },
      success: function(res){
        console.log(res)
        wx.hideLoading()
      }
    })
  },
  onLoad:function(options) {
    db.collection('Courses').get({
      success: res=>{
        console.log('请求成功',res)//res.data包含该记录的数据
        this.setData({
          List: res.data
        })
      },
      fail(err){
        console.log('请求失败',err)
      }
    })
  },


  uploadimg: function() {
    var that = this;
    //选择图片
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        that.setData({
          showImage_url: tempFilePaths
        })
        //图片上传
        wx.uploadFile({
          url: 'cloud://cloud1-1gbl7ldm505fd1a8.636c-cloud1-1gbl7ldm505fd1a8-1323972207/课程',//调用后台接口的路径
          method:'POST',
          filePath: that.data.showImage_url,
          name: '课程',//此处注意要与后台保持一致
          header: {
            "Content-Type": false,
          },
          //formdata:adds,
          success: function(res) {}
        })
      }
    })
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

  }
})