// miniprogram/pages/index/lucky/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circleList: 24, //圆点
    awardList: [{
      img: "icon-comment",
      name: ".top域名 1元/年"
    }, {
        img: "icon-rocket",
      name: "VPS 1元/30天"
    }, {
      img: "icon-search",
      name: "免费主机1年"
    }, {
        img: "icon-rocket",
      name: "虚拟主机1元/年"
    }, {
        img: "icon-comment",
      name: ".top域名 1元/年"
    }, {
        img: "icon-search",
      name: "VPS 1元/30天"
    }, {
        img: "icon-rocket",
      name: "免费主机1年"
    }, {
        img: "icon-comment",
      name: "虚拟主机1元/年"
    }], //奖品数组
    indexSelect: 0, //被选中的奖品index
    isRunning: false, //是否正在抽奖
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //获取随机数
  getRandom: function (u) {
    let rnd = Math.random() > 0.5 ? "2" : "1";
    u = u || 3;
    for (var i = 0; i < u; i++) {
      rnd += Math.floor(Math.random() * 10);
    }
    return Number(rnd);
  },
  //开始抽奖
  startDrawing: function () {
    if (this.data.isRunning) return
    this.setData({
      isRunning: true
    })
    let indexSelect = 0
    let i = 0;
    let randomNum = this.getRandom(3);
    let timer = setInterval(() => {
      ++indexSelect;
      //这里用y=30*x+150函数做的处理.可根据自己的需求改变转盘速度
      indexSelect = indexSelect % 8;
      this.setData({
        indexSelect: indexSelect
      })
      i += 40;
      if (i > randomNum) {
        //去除循环
        clearInterval(timer)
        timer = null;
        //获奖提示
        wx.showModal({
          title: '恭喜您',
          content: `获得了奖品【${this.data.awardList[indexSelect].name}】`,
          confirmColor: '#5677FC',
          showCancel: false, //去掉取消按钮
          success: (res) => {
            if (res.confirm) {
              this.setData({
                isRunning: false
              })
            }
          }
        })
      }
    }, (70 + i))
  }
})