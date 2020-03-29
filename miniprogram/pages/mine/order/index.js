const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    tabs: [ {
      name: "待付款"
    }, {
      name: "待收货"
    }, {
      name: "待评价"
    }],
    currentTab: 0,
    pageIndex: 1,
    loadding: false,
    pullUpOn: true,
    scrollTop: 0,
    list:[]
  },

  onLoad: function(options) {
    console.log(options)
    if(options.currentTab){
      var currentTab=options.currentTab
      this.setData({
        currentTab
      })
    }
    
    this.getData(this.data.currentTab)
  },
  change(e) {
    this.setData({
      currentTab: e.detail.index
    })
    this.getData(e.detail.index)
  },
  detail() {
    wx.navigateTo({
      url: '../orderDetail/orderDetail'
    })
  },
  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 300);
  },
  onReachBottom() {
    //只是测试效果，逻辑以实际数据为准
    this.setData({
      loadding:true,
      pullUpOn:true
    })
    setTimeout(() => {
      this.setData({
        loadding: false,
        pullUpOn: false
      })
    }, 1000)
  },
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  // 获取数据 
  getData:function(k){
    var that=this
    var id=wx.getStorageSync('id')
    db.collection('userInfo').doc(id).get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log("购物车",res.data)
        let data=res.data
        if(k==0){
          data.shoppingCar.forEach(item => {
            item.total=item.number*item.price
          });
          that.setData({
            list:data.shoppingCar,
          })
        }else if(k==1){
          data.delivery.forEach(item => {
            item.total=item.number*item.price
          });
          that.setData({
            list:data.delivery,
          })

        }else if(k==2){
          data.finish.forEach(item => {
            item.total=item.number*item.price
          });
          that.setData({
            list:data.finish,
          })
        }
        
      }
    })
  }
})