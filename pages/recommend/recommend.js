Page({
  data: {
    BlockId:'block0',
    currentindex:0,
    BookList:[]
  },
  onLoad:function(options){
    const CourseName = options.CourseName;
    this.setData({
      CourseName:CourseName
    });
    const db = wx.cloud.database();
    const Reading = db.collection("Reading");
    Reading.where({
      CourseName:CourseName
    }).get({
      success: res => {
        this.setData({
          BookList:res.data
        });
        console.log(this.data.BookList);
      }
    })
  },
  prevPage: function() {
    if(this.data.currentindex >0){
      this.setData({
        currentindex:this.data.currentindex-1,
        BlockId:'block'+(this.data.currentindex-1)
      });

    }
    console.log(this.data.currentindex);
  },
  nextPage: function() {
    var max = this.data.BookList.length-1
    if(this.data.currentindex < max){
      this.setData({
        currentindex:this.data.currentindex+1,
        BlockId:'block'+(this.data.currentindex+1)
      });
    }
    console.log(this.data.currentindex);
  },
  add(){
    wx.navigateTo({
      url: '/pages/addReading/addReading?CourseName='+this.data.CourseName,
    })
  },
  end:function(){
    this.setData({
      BlockId:'block'+this.data.currentindex
    })
  }
});