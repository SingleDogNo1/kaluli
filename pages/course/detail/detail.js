var _ = require('../../../utils/tools');
var WxParse = require('../../../libs/wxParse/wxParse.js');
Page({
    data: {
        all: 0,
        current: 1
    },
    change: function (e) {
        this.setData({
            current: e.detail.current + 1
        })
    },
    onLoad: function (options) {
        let option = this.options._id;
        let self = this;
        _.post('/rest/clazz/get', { clazz_id: option }, function (res) {
            let html = res.data.details;
            WxParse.wxParse('html', 'html', html, self);
            wx.setNavigationBarTitle({
                title: 'aaaaa'
            })
            self.setData({
                tiyanMsg: res.data,
                all: res.data.imgs.length
            });
        })
    },
    onPullDownRefresh: function () {
        this.onLoad();
        wx.stopPullDownRefresh();
    }
})