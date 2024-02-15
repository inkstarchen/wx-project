
Page ({
  data: {
    Number:[],
    OpenId:"",
    Course:[],
    CourseName:"",
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
    });
    const db = wx.cloud.database();
    const Courses = db.collection("Courses");
    const Readings = db.collection("Reading");
    const Resources = db.collection("Resource")
    const User = db.collection("User");
    const openid = wx.getStorageSync('OpenId');
    Resources.where({
      CourseName:this.data.CourseName,
      Type:'Resource'
    }).get({
      success: res => {
        let Number1 = this.data.Number;
        Number1.push(res.data.length);
        this.setData({
          Number:Number1
        });
        Resources.where({
          CourseName:this.data.CourseName,
          Type:'Exam',
        }).get({
          success: res =>{
            let Number1 = this.data.Number;
            Number1.push(res.data.length);
            this.setData({
              Number:Number1
            });
            Resources.where({
              CourseName:this.data.CourseName,
              Type:'Note',
            }).get({
              success: res =>{
                let Number1 = this.data.Number;
                Number1.push(res.data.length)
                this.setData({
                  Number:Number1
                });
                Readings.where({
                  CourseName:this.data.CourseName,
                }).get({
                  success: res => {
                    let Number1 = this.data.Number;
                    Number1.push(res.data.length);
                    this.setData({
                      Number:Number1
                    })
                  }
                })
              }
            });
          }
        });
      }
    });
    
    
    
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
    Courses.where({
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
  },
  handleHot1: function(event){
      wx.navigateTo({
        url: '/pages/resource/resource?CourseName='+this.data.CourseName+'&FileType=Resource',
      })
    },
   handleHot2:function(){
      wx.navigateTo({
        url: '/pages/exam/exam?CourseName='+this.data.CourseName+'&FileType=Exam',
      })
    },
    handleHot3:function(){
      wx.navigateTo({
        url: '/pages/note/note?CourseName='+this.data.CourseName+'&FileType=Note',
      })
    },
    handleHot4:function(){
      wx.navigateTo({
        url: '/pages/recommend/recommend?CourseName='+this.data.CourseName+'&FileType=Reading',
      })
    }
})