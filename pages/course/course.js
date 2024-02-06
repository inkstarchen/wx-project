import userList from "../../datas/userList.js";
Page ({
  data: {
    OpenId:"",
    Course:[],
    CourseName:"",
    users: [],
    broads: [],
    item:{
      Type:'Course',
      CourseName:'',
      favor:false,
    }
  },

onLoad: function(options) {
    this.setData({
      'item.CourseName':options.CourseName,
      CourseName: options.CourseName,
      FileType:options.FileType,
      users: userList.users,
      broads: userList.latest,
    });
    const db = wx.cloud.database();
    const collection = db.collection("Courses");
    const User = db.collection("User");
    const openid = wx.getStorageSync('OpenId');
    User.where({
      _openid:openid,
    }).get({
      success: res => {
        if(res.data[0].Courses.indexOf(this.data.CourseName) != -1){
          this.setData({
            'item.favor':true,
          });
        }
      },
      fail: err => {
        console.log(err);
      }
    })
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