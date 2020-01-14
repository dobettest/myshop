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
    ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

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