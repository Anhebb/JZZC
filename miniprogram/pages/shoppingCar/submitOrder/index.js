const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    hasCoupon: false,
    insufficient: false,
    product:'',
    def:'',
    number:'',
    total:0
  },
  onLoad: function (options) {
    console.log(options)
     var def =wx.getStorageSync('def')
     var number=options.number
    if(options.kind==1){
     var pid=parseInt(options.pid) 
     this.getProductData(pid)
    }
    this.setData({
      def,
      number
    })
  },
  chooseAddr() {
    wx.navigateTo({
      url: "../../mine/address/index"
    })
  },
  btnPay() {
    this.paySucceed()
    wx.navigateTo({
      url: "../paySuccess/index"
    })
  },
     // 获取数据 
     getProductData:function(pid){
      var that=this
      const _ = db.command
      db.collection('productList').where({
        pid:pid
      }).get({
        success: function(res) {
          // res.data 包含该记录的数据
          console.log('商品详情',res.data)
          let data=res.data[0]
          that.setData({
            product:data,
          })
        }
      })
    },

    // 支付成功，修改数据库
  paySucceed:function(){
    let number=parseInt(this.data.number) 
    let product=this.data.product
    product.number=number
    let id=wx.getStorageSync('id')
    var that = this
    var pid=this.data.product._id

    wx.cloud.callFunction({
      // 云函数名称
      name: 'update',
      // 传给云函数的参数
      data: {
        id:id,
        pid:pid,
        product:product,
        todo:'submitOrder',
        number:number
      },
      success: function (res) {
        console.log("我需要的",res)
        db.collection('productList').doc(id).get({
          success: function(res) {
            // res.data 包含该记录的数据
            console.log("22222",res.data)
          }
        })
      },
      fail: console.error
    })
  },
})