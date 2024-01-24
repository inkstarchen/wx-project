// components/latestItem/latestItem.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleHot: function(event) {
      const data = this.properties.item;
      if(data.name == '读物推荐'){
        wx.navigateTo({
          url: '/pages/recommend/recommend',
        })
      }
      if(data.name == '历年卷'){
        wx.navigateTo({
          url: '/pages/exam/exam',
        })
      }
      if(data.name == '资料'){
        wx.navigateTo({
          url: '/pages/resource/resource',
        })
      }
      
  }
  }
})