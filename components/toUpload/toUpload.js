// components/toUpload/toUpload.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    CourseName:{
      type:String,
      value:''
    },
    FileType:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
    ready:function(){
      this.setData({
        FileType:this.properties.FileType,
        CourseName:this.properties.CourseName
      })
      console.log(this.properties)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toUpload:function(e){
      wx.navigateTo({
        url: '/pages/upload/upload?FileType='+this.data.FileType+'&CourseName='+this.data.CourseName,
      })
    },
  }
})