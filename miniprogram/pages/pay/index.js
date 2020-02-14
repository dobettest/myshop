//Page Object
import { getSetting, openSetting, chooseAddress, showModal,showToast } from "../../utils/asyncWX.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  //1、获取用户收货地址
  //1.绑定点击事件
  //2、调用微信内置api chooseAddress
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0

  },
  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    let checkedCart=cart.filter(v=>v.check)
    cart=checkedCart
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
    });
    //防止cart为空数组时结果为true
    this.setData({
      address,
      cart,
      totalPrice,
      totalNum
    })
  },
}

);