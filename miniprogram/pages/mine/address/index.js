const db = wx.cloud.database()
const app=getApp()
Page({
  data: {
    addressList: []
  },
  onLoad: function (options) {
    this.getData()
  },
  editAddr(index, addressType) {
    wx.navigateTo({
      url: "./editAdress/index"
    })
  },

  add:function(){
    const _ = db.command
db.collection('todo').doc('todo-id').update({
  data: {
    // 表示指示数据库将字段自增 10
    text: _.inc(10)
  },
  success: function(res) {
    console.log(res.data)
  }
})
  },
    // 获取数据 
    getData:function(){
      var that=this
      var openid=app.globalData.openid
      db.collection('userInfo').where({
        _openid:openid
      }).get({
        success: function(res) {
          // res.data 包含该记录的数据
          console.log(res.data)
          let data=res.data[0]
          that.setData({
            addressList:data.address,
          })
        }
      })
    }
})