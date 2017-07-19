var _ = require('../../../utils/tools');
var WxParse = require('../../../libs/wxParse/wxParse.js');
Page({
    data: {
        current: 1,
        all: 0,
    },
    change: function (e) {
        this.setData({
            current: e.detail.current + 1
        })
    },
    onLoad: function () {
        let self = this;
        var option=this.options.coachId;
        console.log(option);
        _.post('/rest/coach/get', {coach_id:option}, function (res) {
            let html = res.data.honor;
            WxParse.wxParse('html', 'html', html, self);
            self.setData({
                coachMsg: res.data,
                all:res.data.imgs.length
            });
        });
    },
    onPullDownRefresh: function () {
        this.onload();
        wx.stopPullDownRefresh();
    }
})