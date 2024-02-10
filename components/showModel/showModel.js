

// components/showModel/showModel.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    Category:{
      type:String,
      value:''
    },
    item:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    Category:'',
    Resources:[],

  },
  lifetimes:{
    ready:function(){
      this.setData({
        Category:this.properties.Category,
        Resources:this.properties.item
      })
      console.log(this.properties.item);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    show:function(){
      console.log('yes');
      if(this.data.show == true){
        this.setData({
          show:false,
        });
      }else{
        this.setData({
          show:true,
        })
      }
    },
  }
})