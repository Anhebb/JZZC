Page({
  data: {
    hasCoupon: true,
    insufficient: false
  },
  onLoad: function (options) {

  },
  chooseAddr() {
    wx.navigateTo({
      url: "../../mine/address/index"
    })
  },
  btnPay() {
    wx.navigateTo({
      url: "../paySuccess/index"
    })
  }
})