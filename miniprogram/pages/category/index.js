// pages/category/index.js
import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 滚动列表
    leftMenuList:[],
    // 右边的内容
    rightContent:[],
    // 接口返回的数据
    Cates:[],
    // 当前激活的索引
    currentIndex:0,
    //右侧滚动条距离顶部位置
    ScrollTop:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*先判断本地存储中有没有旧的数据
    {time:Date.now(),data:[]}
    没有旧数据，直接发送网络请求
    如果旧数据存在且没有过期,则使用本地存储的旧数据*/
    /*web和微信小程序本地存储的区别
    1、
    web:localStore.setItem("key","value"),localStorage.getItem("key")
    小程序:wx.SetStoreAsync("key","value"),wx.getStorageAsync("key")
    2、web：无论存储的数据是何种格式都会先调用toString()方法
    */
    const Cates=wx.getStorageSync("Cates");
    if(!Cates)
    {
    this.getScrollList();
   }
    else{
      //定义过期时间,此处为10s
      if(Date.now()-Cates.time>1000*10)
      {
        this.getScrollList();
      }
      else{
        console.log("可以使用旧数据");
      }
    }
  },
  async getScrollList()
  {
    // request({
    //   url: '/categories',
    // }).then(res=>
    //   {
    //     this.Cates=res.data.message;
    //     wx.setStorageSync("Cates",{time:Date.now(),data:this.Cates});
    //     let leftMenuList=this.Cates.map(v=>v.cat_name);
    //     let rightContent=this.Cates[0].children;
    //     console.log(rightContent)
    //     this.setData(
    //       {
    //         leftMenuList,
    //         Cates:res.data.message,
    //         rightContent
    //       }
    //     )
    //   })
    /*优化为es7的async await 语法*/
    const res=await request({url: '/categories'});
    console.log(res);
    this.Cates=res;
        wx.setStorageSync("Cates",{time:Date.now(),data:this.Cates});
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        // console.log(rightContent)
        this.setData(
          {
            leftMenuList,
            Cates:res,
            rightContent
          }
        )
    
  },
  //左边菜单滚动栏点击函数
  handleItemTap(e){
   const {index}=e.currentTarget.dataset;
   this.setData({
     currentIndex:index,
     rightContent:this.Cates[index].children,//点击左边导航右边内容自动跟随变化
     ScrollTop:0
   })
  } 
})