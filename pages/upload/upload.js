// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CourseName:'',
    FileType:'',
    upLoadFiles:[],
  },
  reset:function(){
    this.setData({
      uploadFiles:[],
    })
  },
  submitForm:function(e){
    var Category=e.detail.value.Category
    if(Category == ''){
      wx.showModal({
        title: '警告',
        content: '未填写文件分类',
      })
    }else{
      const db = wx.cloud.database();
      const Resource = db.collection('Resource');
      for(let i = 0; i < this.data.upLoadFiles.length ; i++){
        let file = this.data.upLoadFiles[i];
        console.log('upload');
        Resource.add({
          data:{
            Category:Category,
            CourseName:this.data.CourseName,
            FileId:file.FileId,
            FileName:file.FileName,
            Type:this.data.FileType,
          }
        })
        wx.cloud.uploadFile({
          cloudPath: file.FileId,
          filePath: file.FilePath,
          success(res) {
            resolve(res)
          },
          fail(err) {
            resolve(false)
            console.error("===== 上传文件失败 =====", err)
          },
        });
      }
      wx.navigateBack({
        delta:1,
      })
      wx.showToast({
        title: '文件上传成功',
      })
    }
  },
  resetForm:function(e){
    this.setData({
      Category:""
    })
  },
  removeFile:function(e){
    wx.navigateTo({
      url: `/pages/removeFile/removeFile?CourseName=${this.data.CourseName}&FileType=${this.data.FileType}`,
    })
  },
  async uploadFileTap(res) {
    // 上传类型
    const type = res.currentTarget.dataset.type
    let filePathObj = null
    let filePathList = []
  
    if (type == 'file') {
      filePathObj = await this.chooseMessageFile(1, 'file')
      if (!filePathObj) return
      filePathList.push(filePathObj.tempFiles[0].path)
    } else if (type == 'img') {
      filePathObj = await this.chooseImg(2)
      if (!filePathObj) return
      filePathList = filePathObj.tempFilePaths
    } else {
      return
    }
  
    console.log("选择文件信息 ====>", filePathObj)
  
    let cloudPathList = []
  
    for (let i = 0; i < filePathList.length; i++) {
      const cloudPathObj = await this.upLoadFile(filePathList[i], 'file')
      if (!cloudPathObj) {
        continue
      }
      console.log(filePathList[i], "文件上传成功=====>", cloudPathObj)
      cloudPathList.push(cloudPathObj.fileID)
    }
      
    console.log("最终返回云文件ID列表 =====>", cloudPathList)
  
  },
  
  /**
   * 从聊天记录选择文件
   * @param {number} count 可选择数量（1-100）
   * @param {string} type 可选择文件类型 all:全部类型 video: 仅视频 image: 仅图片 file: 除了视频、图片外的文件类型
   */
  chooseMessageFile(count, type) {
    return new Promise((resolve, reject) => {
      wx.chooseMessageFile({
        count: count,
        type: type,
        success(res) {
          resolve(res)
        },
        fail(err) {
          console.log("选择文件错误 =====>", err)
          resolve(false)
        }
      })
    })
  },
  
  /** 选择图片封装函数
   * @param count 照片数量
   * @param sizeType 照片的质量, 默认 ['original', 'compressed']
   * @param sourceType 照片来源, 默认 ['album', 'camera']
   */
  chooseImg(count, sizeType, sourceType) {
    if (!count) count = 1
    if (!sizeType) sizeType = ['original', 'compressed']
    if (!sourceType) sourceType = ['album', 'camera']
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: count,
        sizeType: sizeType,
        sourceType: sourceType,
        success(res) {
          resolve(res)
        },
        fail(err) {
          resolve(false)
          console.error("===== 选取照片失败 =====", err)
        }
      })
    })
  },
  
  /** 
   * 上传文件封装函数, 文件名随机性处理，由17位随机字符+13位时间戳组成
   * @param {string} filePath 要上传图片的临时路径
   * @param {string} cloudPathPrefix 云数据库存储文件路径前缀
   */
  upLoadFile(filePath, cloudPathPrefix) {
    // 取随机名
    console.log(filePath);
    return new Promise((resolve, reject) => {
    wx.showModal({
      editable:true,
      placeholderText:"请输入文件名称",
      complete: (res) => {
        if (res.cancel) {
          console.log('用户点击取消')
        }
        if (res.confirm) {
         let Name = res.content;
         let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomStr = '';
        for (let i = 17; i > 0; --i) {
          randomStr += str[Math.floor(Math.random() * str.length)];
        }
        randomStr += new Date().getTime()
          let suffix = /\.\w+$/.exec(filePath)[0] //正则表达式返回文件的扩展名
          let cloudPath = cloudPathPrefix + '/' + randomStr + suffix
          let item = {
              FileName:Name,
              FileId:cloudPath,
              FilePath:filePath,
          };
          let upLoadFiles = this.data.upLoadFiles;
          upLoadFiles.push(item);
          this.setData({
            uploadFiles:upLoadFiles
          });
          console.log(this.data.upLoadFiles);
        }
      }
    })
  })
  },
  
    /**
     * 生命周期函数--监听页面加载
     */
     onLoad(options) {
      this.setData({
        CourseName:options.CourseName,
        FileType:options.FileType
      })
      console.log(this.data.CourseName);
      console.log(this.data.FileType);
      switch(this.data.FileType){
        case"Exam":this.setData({title:"历年卷上传"});break;
        case"Resource":this.setData({title:"资料上传"});break;
        case"Note":this.setData({title:"笔记上传"});break;
      }
      console.log(this.data.CourseName)
      console.log(this.data.FileType)
      console.log(this.data.title)
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
          Type:this.data.fileType
        }).get({
          success: res => {
            console.log(res.data);
            this.setData({
              tests:res.data
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