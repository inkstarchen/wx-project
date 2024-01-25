import userList from "../../datas/userList.js";
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page ({
  data: {
    users: [],
    broads: [],

    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),

  },

onLoad: function(options) {
    this.setData({
      users: userList.users,
      broads: userList.latest
    });
    console.log(userList);
    console.log(userList.latest);
  },

  userInfo: {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
  },
  hasUserInfo: false,
  canIUseGetUserProfile: wx.canIUse('getUserProfile'),
  canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
})