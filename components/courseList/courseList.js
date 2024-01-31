// components/courseList/courseList.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    OpenId:"",
    item:{
      type:Object,
      value:{}
    }
  },
  lifetimes:{
    created() {
      this.setData({
        item:this.properties.item,
        'item.favor':false
      })
      const OpenId = wx.getStorageSync('OpenId');
      const db = wx.cloud.database();
      const collection = db.collection("User");
      collection.where({
        _openid: OpenId
      }).get({
        success: res => {
          if (res.data[0].Courses.indexOf(this.data.item.Name) !== -1) {
            this.setData({
              'item.favor': true
            }, () => {
              console.log(this.data.item.favor);
            });
          }
        }
      });
      
    }
  },
  
  
  
  /**
   * 组件的初始数据
   */
  data: {
    item:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    to_course: function(e) {
      wx.navigateTo({
        url: '/pages/course/course?CourseName='+this.data.item.Name,
      })
  }
  }
})