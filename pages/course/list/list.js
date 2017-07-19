var _ = require('../../../utils/tools');
Page({
    data: {},
    onLoad: function () {
        let self = this;
        _.post('/rest/clazz', {}, function (res) {
            console.log(res);
            self.setData({
                course: res.data
            });
        });
    },
    onPullDownRefresh: function () {
        this.onLoad();
        wx.stopPullDownRefresh();
    }
})