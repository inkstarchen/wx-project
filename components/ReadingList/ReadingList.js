// components/ReadingList.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    },
    index:{
      type:String,
      value:''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
    attached(){
      this.setData({
        Block:'block'+this.properties.index
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})