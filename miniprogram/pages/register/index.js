const app=getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    sexs: ['男', '女'],
    nickName:'',
    sex:'',
    userName:'',
    phone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
  // 输入信息
  input: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var value = e.detail.value
    switch (index) {
      case "1":
        this.setData({
          userName: value
        });
        break;
      case "2":
        this.setData({
          nickName: value
        });
        break;
      case "3":
        this.setData({
          phone: value
        });
        break;

    }
  },
  // 改变性别
  sexChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var sex =this.data.sexs[e.detail.value]
    this.setData({
      sex
    })
  },
   // 获取数据 
   getData:function(){
    var that=this
    var id=wx.getStorageSync('id')
    db.collection('userInfo').doc(id).get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        let data=res.data
        that.setData({
          userInfo:data.userInfo,
          nickName:data.userInfo.nickName
        })
      }
    })
  },
  // 保存数据
  saveData: function () {
    var that = this
    var id=wx.getStorageSync('id')

    wx.cloud.callFunction({
      // 云函数名称
      name: 'update',
      // 传给云函数的参数
      data: {
        id:id,
        todo:'register',
        sex: this.data.sex,
        phone: this.data.phone,
        userName: this.data.userName,
        nickName: this.data.nickName
      },
      success: function (res) {
        console.log("我需要的",res)
        db.collection('userInfo').doc(id).get({
          success: function(res) {
            // res.data 包含该记录的数据
            console.log("1111",res.data)
            wx.setStorage({
              key:"userInfo",
              data:res.data
            })
          }
        })
        wx.switchTab({
          url: '../tabBar/mine',
        });
      },
      fail: console.error
    })
  }
})