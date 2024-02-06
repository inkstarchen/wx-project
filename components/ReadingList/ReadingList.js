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
      type:Number,
      value:0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    viewmore:false,
    item:{
    }
  },
  lifetimes:{
    attached(){
      this.setData({
        Block:'block'+this.properties.index,
        'item._id':this.properties.item._id,
        'item.favor':false,
        'item.Type':"Reading"
      });
      const db = wx.cloud.database();
      const openid = wx.getStorageSync('OpenId');
      const User = db.collection('User');
      User.where({
        _openid: openid,
      }).get({
        success: res => {
          if(res.data[0].Readings.indexOf(this.data.item._id) != -1){
            this.setData({
              'item.favor':true
            });
          }
        },
        fail: err => {
          console.log(err);
        }
      })
      console.log(this.data.Block);
      this.setData({
        lines:this.properties.item.Lines.split("\n")
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    viewmore:function(){
      if(this.data.viewmore){
        this.setData({
          viewmore:false
        })
      }else{
        this.setData({
          viewmore:true
        })
      }

    }
  }
})