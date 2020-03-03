const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    category: [{
      img: "/images/index/shuiguo.png",
      name: "时令水果"
    }, {
      img: "/images/index/Vegetables-.png",
      name: "新鲜蔬菜"
    }, {
      img: "/images/index/shushi.png",
      name: "肉蛋熟食"
    }, {
      img: "/images/index/haixian.png",
      name: "海鲜水产"
    }, {
      img: "/images/index/niunai.png",
      name: "安心乳品"
    }, {
      img: "/images/index/jiushuiyinliao.png",
      name: "酒水饮料"
    }, {
      img: "/images/index/liangyou.png",
      name: "粮油速食"
    }, {
      img: "/images/index/sudong.png",
      name: "速冻食品"
    }],
    animation:false,//轮播告示
    current:0,
    cardCur:0,//轮播banner下标
    hotSearch: [],
    banner:[],
    hotProduct: [],
  },
  onLoad: function () {
    // 启动轮播
    setTimeout(()=>{
      this.setData({
        animation:true
      })
    },600)
   },
   onShow:function(){
     this.getData()
   },
   change: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
     // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // 获取数据 
  getData:function(){
    var that=this
    db.collection('index').get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        let data=res.data
        that.setData({
          banner:data[0].banner,
          hotProduct:data[0].hotProduct,
          hotSearch:data[0].hotSearch,
        })
      }
    })
  }
  
  
})