Page({
  data: {
    scrollLeft:0,
    currentBlock: 'block1', // 初始停留在 block1
    currentindex:1,
    BookList:[]
  },
  onLoad:function(options){
    const CourseName = options.CourseName;
    const db = wx.cloud.database();
    const Reading = db.collection("Reading");
    Reading.where({
      CourseName:CourseName
    }).get({
      success: res => {
        this.setData({
          BookList:res.data
        });
      }
    })
  },
  onScroll: function (event) {
    const scrollLeft = event.detail.scrollLeft;
    this.setData({
      scrollLeft: event.detail.scrollLeft  // 将 scrollLeft 的值保存在数据源中
    });

    
  },
  onmousedown:function(){
    this.setData({
      scrollstart:this.data.scrollLeft
    })
  },
  onmouseup:function(event){
    console.log("12");
    const scrollLeftend = this.data.scrollLeft;
    const scrollLeftstart = this.data.scrollstart
    const blockWidth = 400; // 每个方块的宽度
    const blockIndex = Math.round((scrollLeftend-scrollLeftstart)/200) + this.data.currentindex;
    this.setData({
      currentindex:blockIndex
    })
    const currentBlock = 'block' + blockIndex;
    this.setData({
      currentBlock: currentBlock
    });
  }
});