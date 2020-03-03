Page({
  data: {
    addressList: []
  },
  onLoad: function (options) {
    
  },
  editAddr(index, addressType) {
    wx.navigateTo({
      url: "./editAdress/index"
    })
  }
})