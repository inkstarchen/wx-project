// pages/tests/tests.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CourseName:"",
    Resources:[],
    category:[],
    ResourceList:[],
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
        Type:'Resource'
      }).get({
        success: res => {
          console.log(res.data);
          this.setData({
            Resources:res.data
          })
          let Resources = this.data.Resources;
          let category = [];
          let ResourceList =[];

          for(let i = 0; i < Resources.length ; i++){
            if(category.indexOf(Resources[i].Category) == -1){
              category.push(Resources[i].Category);
              ResourceList.push([Resources[i]]);

            }else{
              ResourceList[category.indexOf(Resources[i].Category)].push(Resources[i]);
            }
          }

          this.setData({
            category:category,
            ResourceList:ResourceList
          })

        },
        fail: err => {
          console.log("获取资料失败",err);
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