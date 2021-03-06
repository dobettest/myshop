//防止一个页面多次请求加载时其他请求未完成就关闭了加载中效果
let ajaxTimes=0;
export const request=params=>{
    ajaxTimes++;
    wx.showLoading({
        title:"加载中",
        mask: true
    });
    const baseUrl="https://api.zbztb.cn/api/public/v1";
    return new Promise((resolve,reject)=>{
        var reqTask = wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>
            {
                resolve(result.data.message)
            },
            fail:(err)=>
            {
                reject(err)
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0)
                wx.hideLoading();
            }
        });

})
}