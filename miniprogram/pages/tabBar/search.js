const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    tabbar: ["推荐分类", "肉类", "蔬菜", "海鲜", "蛋类", "饮料", "其他"],
    recommend:[],
    menuHeight: "", //菜单高度
    currentTab: 0, //预设当前项的值
    scrollTop: 0 //tab标题的滚动条位置
  },
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          menuHeight: res.windowHeight - res.windowWidth / 750 * 92
        });
      }
    });
    this.getData()
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    let cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      wx.pageScrollTo({
        scrollTop: 0
      })
      this.setData({
        currentTab: cur
      })
      this.checkCor();
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    let that = this;
    //这里计算按照实际情况进行修改，动态数据要进行动态分析
    //思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
    //数据很多可以多次if判断然后进行滚动距离计算即可
    if (that.data.currentTab > 7) {
      that.setData({
        scrollTop: 500
      })
    } else {
      that.setData({
        scrollTop: 0
      })
    }
  },
  detail(e) {
    wx.navigateTo({
      url: '../search/product/detail'
    })
  },
  productList(e) {
    let key = e.currentTarget.dataset.key;
    let kind = e.currentTarget.dataset.kind;
    wx.navigateTo({
      url: '../search/productList/index?searchKey=' + key+'&kind='+kind
    })
  },
  search: function () {
    wx.navigateTo({
      url: '../extend-view/news-search/news-search'
    })
  },

   // 获取数据 
   getData:function(){
    var that=this
    const _ = db.command
    db.collection('search').doc('index').get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log("搜索页",res.data)
        let data=res.data
        that.setData({
          tabbar:data.tabbar,
          recommend:data.recommend
        })
      }
    });
  }
})