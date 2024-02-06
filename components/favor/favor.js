
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
    item:{
    },
  },
  lifetimes:{
    ready(){ 
      this.setData({
        item:this.properties.item
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    click:function(){
      console.log("yes")
      
  }
}
})