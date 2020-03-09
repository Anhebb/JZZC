const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexs: ['男', '女'],
    userInfo:'',
    nickName:'',
    sex:'',
    userName:'',
    phone:'',
    showModal:false,
    holdtext:''//缓存区
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
  showModal:function(e){
    console.log(e)
    this.setData({
      showModal:true
    })
  },
  hideModal:function(e){
    console.log(e)
    this.setData({
      showModal:false
    })
  },
  inputNickName:function(e){
    console.log(e)
    var value =e.detail.value
    this.setData({
      holdtext:value
    })

  },
  comfireNickName:function(){
    this.setData({
      nickName:this.data.holdtext,
      showModal:false
    })
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
    var openid=app.globalData.openid
    db.collection('userInfo').where({
      _openid:openid
    }).get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        let data=res.data[0]
        that.setData({
          name:data.name,
          phone:data.phone,
          sex:data.sex,
          userInfo:data.userInfo,
        })
      }
    })
  }
})