// components/latestItem/latestItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      CourseName:{
        type:String,
        value:""
      },
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
          url: '/pages/recommend/recommend?CourseName='+this.properties.CourseName,
        })
      }
      if(data.name == '历年卷'){
        wx.navigateTo({
          url: '/pages/exam/exam?CourseName='+this.properties.CourseName,
        })
      }
      if(data.name == '资料'){
        wx.navigateTo({
          url: '/pages/resource/resource?CourseName='+this.properties.CourseName,
        })
      }
      if(data.name == '笔记'){
        wx.navigateTo({
          url: '/pages/note/note?CourseName='+this.properties.CourseName,
        })
      }
      var json = [

]

var broad = [
  {
      name: "资料",
      thumb: "https://d.musicapp.migu.cn/data/oss/service66/00/2b/b4/0n"
  },
  {
      name: "历年卷",
      thumb: "https://d.musicapp.migu.cn/data/oss/service66/00/2b/2z/te"
  },
  {
      name: "笔记",
      thumb: "https://d.musicapp.migu.cn/data/oss/service66/00/2b/b3/zb"
  },
  {
      name: "读物推荐",
      thumb: "https://d.musicapp.migu.cn/data/oss/service66/00/2b/b4/0t_m.webp"
  }
]

module.exports = {
  users: json,
  latest: broad
}
      
  }
  }
})