import userList from "../../datas/userList.js";
Page ({
  data: {
    OpenId:"",
    Course:[],
    CourseName:"",
    users: [],
    broads: [],
  },

onLoad: function(options) {
    this.setData({
      CourseName: options.CourseName,
      users: userList.users,
      broads: userList.latest,
    });
    const db = wx.cloud.database();
    const collection = db.collection("Courses");
    collection.where({
      Name:options.CourseName
    }).get({
      success: res => {
        this.setData({
          Course:res.data[0]
        })
        console.log(this.data.Course);
        wx.cloud.downloadFile({
          fileID: this.data.Course.FileId,
          success: result => {
            this.setData({
              'Course.FileId':result.tempFilePath
            })
          },
          fail: res => {},
        })
      },
      fail:err => {
        console.error("查询失败",err);
      }
    })
  },
  onShow:function(){
  }
})