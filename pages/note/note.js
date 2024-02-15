// pages/tests/tests.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CourseName:"",
    Notes:[],
    category:[],
    NoteList:[],
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
        Type:'Note'
      }).get({
        success: res => {
          console.log(res.data);
          this.setData({
            Notes:res.data
          })
          let Notes = this.data.Notes;
          let category = [];
          let NoteList =[];

          for(let i = 0; i < Notes.length ; i++){
            if(category.indexOf(Notes[i].Category) == -1){
              category.push(Notes[i].Category);
              NoteList.push([Notes[i]]);

            }else{
              NoteList[category.indexOf(Notes[i].Category)].push(Notes[i]);
            }
          }

          this.setData({
            category:category,
            NoteList:NoteList
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