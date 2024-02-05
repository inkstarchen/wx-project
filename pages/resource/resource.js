
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  toUpload:function(e){
    wx.navigateTo({
      url: '/pages/upload/upload?FileType="Resource"',
    })
  },
  onLoad(options){
    this.setData({
      CourseName:options.CourseName
    });
    console.log(options.CourseName);
  },
  onShow(){
    const db = wx.cloud.database();
    const Resource = db.collection("Resource");
    Resource.where({
      CourseName:this.data.CourseName,
      Type:'Resource'
    }).get({
      success: res => {
        console.log(res.data);
        this.setData({
          resources:res.data
        })
        console.log(this.data.resources);
      },
      fail: err => {
        console.log("获取资料失败",err);
      }
    })
  },
  
  /** 上传按钮点击监听 */
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
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomStr = '';
    for (let i = 17; i > 0; --i) {
      randomStr += str[Math.floor(Math.random() * str.length)];
    }
    randomStr += new Date().getTime()
  
    return new Promise((resolve, reject) => {
      let suffix = /\.\w+$/.exec(filePath)[0] //正则表达式返回文件的扩展名
      let cloudPath = cloudPathPrefix + '/' + randomStr + suffix
      const db = wx.cloud.database();
      db.collection("Resource").add({
        data:{
          FileName:randomStr,
          FileId:cloudPath,
          Type:'Resource',
          CourseName:this.data.CourseName
        }
      });
      db.collection("Resource").where({
        CourseName:this.data.CourseName,
        Type:'Resource'
      }).get({
        success: res => {
          console.log(res.data);
          this.setData({
            resources:res.data
          })
        },
        fail: err => {
          console.log("获取历年卷失败",err);
        }
      })
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: filePath,
        success(res) {
          resolve(res)
          console.log(res);
        },
        fail(err) {
          resolve(false)
          console.error("===== 上传文件失败 =====", err)
        },
      });
      
    })
    
  },
})