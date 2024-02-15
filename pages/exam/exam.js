// pages/tests/tests.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CourseName:"",
    tests:[],
    category:[],
    testList:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(options) {
    this.setData({
      CourseName:options.CourseName,
      FileType:options.FileType
    })
    console.log(this.data.FileType);
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
      const db = wx.cloud.database();
      const Resource = db.collection("Resource");
      Resource.where({
        CourseName:this.data.CourseName,
        Type:'Exam'
      }).get({
        success: res => {
          console.log(res.data);
          this.setData({
            tests:res.data
          })
          let tests = this.data.tests;
          let category = [];
          let testList =[];
          for(let i = 0; i < tests.length ; i++){
            if(category.indexOf(tests[i].Category) == -1){
              category.push(tests[i].Category);
              testList.push([tests[i]]);
            }else{
              testList[category.indexOf(tests[i].Category)].push(tests[i]);
            }
          }
          console.log(testList);
          this.setData({
            category:category,
            testList:testList
          })
        },
        fail: err => {
          console.log("获取历年卷失败",err);
        }
      })

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