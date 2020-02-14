//1.加入购物车
 //1.绑定点击事件
 //2.获取缓存购物车数据,数组格式
 //3.判断当前商品是否存在于购物车，存在则修改数量，否则添加,写回缓存
import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}

  },
  goodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id)

  },
  //点击轮播图预览
  handlePreviewImage(e){
    //console.log('%c'+"预览","color:red")
    const urls=this.goodsInfo.pics.map(v=>v.pics_mid)
    const current=e.currentTarget.dataset.url
    wx.previewImage({
      current:current,
      urls
    });
  },
  async getGoodsDetail(goods_id){
    let goodsObj=await request({url:"/goods/detail",data:{goods_id}})
    this.goodsInfo=goodsObj
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //iphone部分手机不支持webp格式图片
        //最好找后台
        //临时自己改确定后台存在1.webp =>1.jpg
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      },
    })

  },
  handleCartAdd(){
    let cart=wx.getStorageSync("cart")||[];
    let index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    if(index===-1)
    {
      this.goodsInfo.num=1;
      this.goodsInfo.check=true;
      cart.push(this.goodsInfo)

    }else{
      cart[index].num++;
    }
    wx.setStorageSync("cart",cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      //防止用户手抖疯狂点击按钮
      mask: true,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }

})