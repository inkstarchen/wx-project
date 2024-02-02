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
    attached() {
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
          console.log(this.data.item);
          if (res.data[0].Courses.indexOf(this.data.item.Name) !== -1) {
            this.setData({
              'item.favor': true
            });
          }
        }
      });
      wx.cloud.downloadFile({
        fileID: this.data.item.FileId,
        success: result => {
          this.setData({
            'item.FileId':result.tempFilePath
          })
        },
        fail: res => {},
      })
    }
  },
  
  
  
  /**
   * 组件的初始数据
   */
  data: {
    touch:false,
    item:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchstart:function(){
      this.setData({
        touch:true,
      });
    },
    touchend:function(){
      this.setData({
        touch:false,
      });
    },
    to_course: function(e) {
      wx.navigateTo({
        url: '/pages/course/course?CourseName='+this.data.item.Name,
      })
  }
  }
})