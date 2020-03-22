const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popupShow: false,
    number:1,
    address:'',
    def:''//默认地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.pid)
    var pid=parseInt(options.pid)
    this.getData(pid)
    this.getAddress()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showPopup: function () {
    this.setData({
      popupShow: true
    })
  },
  hidePopup: function () {
    this.setData({
      popupShow: false
    })
  },
  // 选择数量改变
  change: function (e) {
    this.setData({
      number: e.detail.value
    })
  },

   // 获取数据 
   getData:function(pid){
    var that=this
    const _ = db.command
    db.collection('productList').where({
      pid:pid
    }).get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log('商品详情',res.data)
        let data=res.data[0]
        that.setData({
          product:data,
        })
      }
    })
  },
   // 获取数据 
   getAddress:function(){
    var that=this
    var openid=app.globalData.openid
    db.collection('userInfo').where({
      _openid:openid
    }).get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log("地址信息",res.data)
        let data=res.data[0]
        var def
        data.address.forEach(element => {
          element.default==true
         def= element
         
        });
        that.setData({
          address:data.address,
          def
        })
      }
    })
  }
})