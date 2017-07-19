// pages/coach/coach.js
var _ = require('../../../utils/tools');
Page({
    data: {

    },
    onLoad: function (options) {
        let self = this;
        _.post('/rest/coach', {}, function (res) {
            console.log(res);
            self.setData({
                coachList: res.data
            });
        });
    },
    onPullDownRefresh: function () {
        this.onLoad();
        wx.stopPullDownRefresh();
    }
})