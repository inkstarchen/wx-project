
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      item: {
          type: Object,
          value: {}
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    touch:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchstart: function () {
      this.setData({
        touch:true
      })
    },
    touchend:function(){
      this.setData({
        touch:false
      })
    },
    handlecollection: function(event) {
      let notLogin = wx.getStorageSync('notLogin');
      const data = this.properties.item;
      if(data.name == '设置'){
        wx.navigateTo({
          url: '/pages/Settings/Settings',
        })
      }else if(notLogin){
        wx.showModal({
          title: '警告',
          content: '你还未登录',
        })
      }else{
        if(data.name == '读物推荐'){
          wx.navigateTo({
            url: '/pages/recommend/recommend',
          })
        }else if(data.name == '历年卷'){
          wx.navigateTo({
            url: '/pages/myexam/myexam',
          })
        }else if(data.name == '课程'){
          wx.navigateTo({
            url: '/pages/mycourse/mycourse',
          })
        }else if(data.name == '资料'){
          wx.navigateTo({
            url: '/pages/myresource/myresource',
          })
        }else if(data.name == '笔记'){
          wx.navigateTo({
            url: '/pages/mynote/mynote',
          })
        }
      }
      
    }
  }

})