Page({
  data: {
    BlockId:'block0',
    currentindex:0,
    BookList:[],
    none:true
  },
  onLoad(options) {
    const OpenId = wx.getStorageSync('OpenId');
    const db = wx.cloud.database();
    const User = db.collection('User');
    const Reading = db.collection('Reading');
    User.where({
      _openid:OpenId
    }).get({
      success: async res => {
        console.log(res.data[0]);
        let myReadings = res.data[0].Readings;
        let Readings = [];
        for(let i = 0; i < myReadings.length; i++){
          try {
            const result = await Reading.where({
              _id: myReadings[i]
            }).get();
            console.log(result.data[0]);
            Readings.push(result.data[0]);
          } catch (err) {
            console.error("获取失败", err);
          }
        }
        console.log(Readings);
        if(Readings.length != 0){
          this.setData({
            BookList:Readings,
            none:false,
          });
        } 
      },
      fail: err =>{
        console.error("获取失败",err);
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