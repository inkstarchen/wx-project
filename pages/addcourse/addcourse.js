const app = getApp()
const db = wx.cloud.database()//全局变量放在page外面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderImage:"",
    showImage_url: '',
    "Name":"",
    "Recommend":"",
    "FileId":"",
    "Info":""
  },
bindSubmit:function(res){
    console.log(res)
    var Name = res.detail.value.Name
    var Info = res.detail.value.Info
    var Recommend = res.detail.value.Recommend
    var tempFilePaths = this.data.tempFilePaths
    const db = wx.cloud.database();
    const collection = db.collection("Courses");
    collection.where({
      Name:Name
    }).get({
      success: res => {
        if(res.data.length != 0){
          console.log("no")
          wx.showModal({
            title: '警告',
            content: '同名课程已经被创建！',
          })
        }else{
          console.log("no");
          for(let i=0; i < tempFilePaths.length; i++){//多个图片的循环上传
            wx.cloud.uploadFile({//上传至微信云存储
              cloudPath:'课程/' + new Date().getTime() + "_" +  Math.floor(Math.random()*1000) + ".jpg",//使用时间戳加随机数作为上传至云端的图片名称
              filePath:tempFilePaths[i],// 本地文件路径
              success: res => {
                // 返回文件 ID
                console.log("上传成功",res.fileID)
                this.setData({
                  images:res.fileID//获取上传云端的图片在页面上显示
                })
                var FileId = this.data.images
                db.collection("Courses").add({
                  data: {
                    "Name":Name,
                    "Recommend":Recommend,
                    "Info":Info,
                    "FileId":FileId
                  },
                  success: function(res){
                    console.log(res)
                    wx.hideLoading()
                    wx.navigateBack({
                      delta:1,
                      success: res =>{
                        wx.showToast({
                          title: '课程创建成功',
                        })
                      },
                      fail: err =>{
                        console.log(err);
                      },
                    })
                  }
                })
              }
            })
          }
        }
      }
    })
  },

  upload(){
    let that=this;
    wx.chooseImage({//异步方法
      count: 9,//最多选择图片数量
      sizeType:['original', 'compressed'],//选择的图片尺寸 原图，压缩图
      sourceType:['album','camera'],//相册选图，相机拍照
      success(res){
        //tempFilePaths可以作为图片标签src属性
        const tempFilePaths = res.tempFilePaths
         console.log("选择成功",res)
         that.setData({
          tempFilePaths:res.tempFilePaths,
          images:res.tempFilePaths[0]
         });
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
  reset:function(){
    this.setData({
      images:""
    })
  }
})