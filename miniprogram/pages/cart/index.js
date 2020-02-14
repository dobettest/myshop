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
    //全选
    allchecked: false,
    totalPrice: 0,
    totalNum: 0

  },
  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];
    //空数组调用every直接返回true
    //const allchecked=cart.length?cart.every(v=>v.check):false;
    let allchecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.check) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
      else {
        allchecked = false
      }
    });
    //防止cart为空数组时结果为true
    allchecked = cart.length != 0 ? allchecked : false
    this.setData({
      address,
      cart,
      allchecked,
      totalPrice,
      totalNum
    })
  },
  async handleChooseAddress() {
    try {
      //1、获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];

      // if (scopeAddress === true ||scopeAddress===undefined)
      if (scopeAddress === false) {
        await openSetting();

      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address);

    }
    catch (error) {
      console.log(error)
    }
  },
  selectAll(e) {
    console.log(e)
    let { cart, allchecked, totalNum, totalPrice } = this.data;
    console.log(cart)
    allchecked = !allchecked;
    totalNum = 0
    totalPrice = 0
    cart.forEach(v => {
      v.check = allchecked
      if (v.check) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    });
    this.setData({
      cart, allchecked, totalNum, totalPrice
    })


  },
  selectItem(e) {
    let { cart } = this.data;
    let { index } = e.currentTarget.dataset;
    let i = cart.findIndex(v => v.goods_id == index)
    cart[i].check = !cart[i].check;
    this.setCart(cart)
  },
  async handleNumEdit(e) {
    let { cart } = this.data;
    let { index, operation } = e.currentTarget.dataset;
    let i = cart.findIndex(v => v.goods_id == index)
    if (cart[i].num === 1 && operation == -1)
    {
    const res = await showModal("你确定要删除当前商品");
    if (res.confirm) {
      cart.splice(i, 1)
      this.setCart(cart)
    }
    }
    else {
      cart[i].num += operation;
      this.setCart(cart)
    }
  },
  setCart(cart) {
    let { allchecked, totalPrice, totalNum } = this.data;
    totalNum = 0
    totalPrice = 0
    allchecked = true;
    allchecked = cart.length == 0 ? false : allchecked;
    cart.forEach(v => {
      if (v.check) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
      else
        allchecked = false
    });
    this.setData({
      cart, allchecked, totalNum, totalPrice
    })
    wx.setStorageSync("cart", cart);
  },
  async handlePay()
  {
    const {address,totalNum}=this.data
    if(!address.userName)
    {
      await showToast('你还没选择收货地址')
      return ;
    }
    if(totalNum===0)
    {
      await showToast('你还没选择商品')
      return ;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
      
  }
}

);