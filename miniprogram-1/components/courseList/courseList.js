// components/courseList/courseList.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
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
    to_course: function(e) {
      wx.navigateTo({
        url: '/pages/course/course',
      })
  }
  }
})