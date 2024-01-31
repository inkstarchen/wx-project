Page({
  data:{
  },
  login:function(e){
    const db = wx.cloud.database();
    const collection = db.collection('User');
    collection.where({
      Email:e.detail.value.email,
    }).get({
      success: res =>{
        if(res.data.length == 0){
          console.log("未查询到用户");
        }else {
          if(res.data[0].Password == e.detail.value.password){
            console.log('登录成功');
            wx.setStorageSync('Email', e.detail.value.email);
            wx.setStorageSync('notLogin',false);
            wx.navigateBack({
              delta:1,
              success: res =>{
                console.log('返回成功')
              },
            });
          }else{
            console.log(res.data);
          }
          }
      },
      fail: err => {
        console.error("查询失败",err);
      }
    })
  }
})