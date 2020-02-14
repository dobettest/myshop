import { request } from "../../request/index.js";
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    goodsList:''


  },
  queryParams:{
    query:'',
    pageSize:10,
    pageNum:1,
    cid:''
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.queryParams.cid=options.cid
    this.getGoodsList();

  },
  onReachBottom(){
    if(this.queryParams.pageNum>=this.totalPages)
    {
      wx.showToast({
        title: '没有下一页数据'});
    }
    else{
      //console.log("%c"+"还有下一页数据","color:red")
      this.queryParams.pageNum++;
      this.getGoodsList();
    }
    
  },
  // 下拉刷新事件
 onPullDownRefresh()
  {
    // 1、重置数组
    this.setData({
      goodsList:[]
    });
    //2、重置页码
    this.queryParams.pageNum=1;
    //3、重新发起请求
    this.getGoodsList()
  },
  async getGoodsList()
  {
    const res=await request({url:'/goods/search',data:this.queryParams})
    const total=res.total;
    this.totalPages=Math.ceil(total/this.queryParams.pageSize)
    // 拼接数组
    this.setData({goodsList:[...this.data.goodsList,...res.goods]})
    wx.stopPullDownRefresh()
  },
  //从子组件获取的子组件回调函数
  handleTabsItemChange(e){
    // 获取被点击的标题索引
   const {index}=e.detail;
  //  获取源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>{
      v.isActive=i==index?true:false
    })
    this.setData({
      //更新数组
      tabs
    })
  }
})