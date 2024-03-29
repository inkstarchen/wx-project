// index.js


Page({
  data: {
    nickName:"",
    User: {
      AvatarUrl: "cloud://cloud1-1gbl7ldm505fd1a8.636c-cloud1-1gbl7ldm505fd1a8-1323972207/系统图片/个人头像.png",
      Name: '',
    },
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { Name } = this.data.User
    this.setData({
      "User.AvatarUrl": avatarUrl,
    })
  },
  onInputChange(e) {
    const Name = e.detail.value
    const { AvatarUrl } = this.data.User
    this.setData({
      'User.Name': Name,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  finish:function(e){
    const db = wx.cloud.database();
    const OpenId = wx.getStorageSync('OpenId');
    const collection = db.collection("User");
    collection.where({
      Name:e.detail.value.Name
    }).get({
      success: res =>{
        if(res.data.length == 1 && res.data[0]._openid!= OpenId){
          wx.showModal({
            title: '警告',
            content: '此用户名已经被使用',
          });
        }else{
          console.log(this.data.UserName);
          collection.where({
            _openid:OpenId
          }).update({
          data: {
            AvatarUrl:"cloud://cloud1-1gbl7ldm505fd1a8.636c-cloud1-1gbl7ldm505fd1a8-1323972207/个人头像图片/"+this.data.User.AvatarUrl.slice(11),
            Name : e.detail.value.Name,
          }
        }),
        wx.cloud.uploadFile({
          cloudPath:'个人头像图片/'+this.data.User.AvatarUrl.slice(11),
          filePath: this.data.User.AvatarUrl,
          success: res => {
            const fileID = res.fileID;
            console.log(fileID);
            wx.showToast({
              title: '信息更改成功',
            });
            wx.navigateBack({
              delta:1
            });
          },
          fail: console.error
        })
        }
      }
    });
  },
  onLoad:function(options){
    console.log(options);
    const OpenId = wx.getStorageSync('OpenId');
    console.log(OpenId);
    const db = wx.cloud.database();
    const collection = db.collection('User');
    collection.where({
      _openid:OpenId
    }).get({
      success: res => {
        console.log(res);
        this.setData({
          User:res.data[0],
        });
        wx.cloud.downloadFile({
          fileID:res.data[0].AvatarUrl,
          complete: res => {
            this.setData({
              'User.AvatarUrl':res.tempFilePath
            });
          }
        });
      },
      fail: err => {
        console.error("获取数据失败",err);
      }
    })

  }
})
