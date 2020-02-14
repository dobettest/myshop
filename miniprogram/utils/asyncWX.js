export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}
export const showModal=(content)=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content,
            success: (result) => {
               resolve(result)
            },
            fail: (err) => {
                reject(err)

            },
        });
          
          
    })
}
export const showToast=(title)=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title,
            icon:'none',
            success: (result) => {
               resolve(result)
            },
            fail: (err) => {
                reject(err)

            },
        });
          
          
    })
}