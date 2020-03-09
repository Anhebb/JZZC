const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    lists: ["公司", "家", "学校", "其他"],
    content1: '',
    content2: '',
    content3: '',
    def: true
  },
  onLoad: function (options) {

  },
  // 输入收获人信息
  input: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var value = e.detail.value
    switch (index) {
      case "1":
        this.setData({
          content1: value
        });
        break;
      case "2":
        this.setData({
          content2: value
        });
        break;
      case "3":
        this.setData({
          content3: value
        });
        break;

    }
  },
  // 改变默认地址按钮
  change: function (e) {
    console.log(e)
    this.setData({
      def: e.detail.value
    })
  },

  saveData: function () {
    var that = this
    var id=wx.getStorageSync('id')
    wx.cloud.callFunction({
      // 云函数名称
      name: 'update',
      // 传给云函数的参数
      data: {
        id:id,
        todo:'address',
        name: this.data.content1,
        phone: this.data.content2,
        address: this.data.content3,
        default: this.data.def
      },
      success: function (res) {
        console.log(res)
        const pages = getCurrentPages();//获取页面栈
        const beforePage = pages[pages.length - 2];  //前一个页面
        wx.navigateBack({ //跳转到前一个页面
          success: function () {
            //调用前一个页面的方法updateTime()。
            beforePage.getData(); 
          }
        })
    
      },
      fail: console.error
    })
  }
})