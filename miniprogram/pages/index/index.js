//Page Object
import { request } from "../../request/index.js"
Page({
    data: {
        // 轮播图数组
        swiperList: [],
        CatList: [],
        FloorList: []

    },
    //options(Object)
    onLoad: function (options) {
        this.getSwiperList();
        this.getCatList();
        this.getFloorList();
    },
    getSwiperList() {
        request({
            url: '/home/swiperdata',
        }).then(res => {

            console.log(res)
            this.setData({
                swiperList: res
            })
        });

    },
    getCatList() {
        request({
            url: '/home/catitems'
        }
        ).then(res => {

            console.log(res)
            this.setData({
                CatList: res
            })
        });
    },
    getFloorList() {

        request({
            url: '/home/floordata'
        }
        ).then(res => {

            console.log(res)
            this.setData({
                FloorList: res
            })
        });

    }
});