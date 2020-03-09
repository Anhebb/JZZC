//app.js
App({
  onLaunch: function () {
    this.setNavHeight()
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    this.getOpenId()
  },
  globalData: {},//全局变量
  setNavHeight: function () {
    let systemInfo = wx.getSystemInfoSync();
    let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null; //胶囊按钮位置信息
    wx.getMenuButtonBoundingClientRect();
    let navBarHeight = (function () { //导航栏高度
      let gap = rect.top - systemInfo.statusBarHeight; //动态计算每台手机状态栏到胶囊按钮间距
      return 2 * gap + rect.height;
    })();
    console.log(navBarHeight)
    this.globalData.navH=navBarHeight
  },

  // 获取openid
  getOpenId:function(){
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.openid = res.result.openid;
        wx.setStorage({
          key:"openid",
          data:res.result.openid
        })
        console.log(this.globalData.openid);

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err);
      }
    })
  }
})
