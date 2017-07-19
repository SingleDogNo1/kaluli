var _ = require('../../../utils/tools');
Page({
	data: {
		titlea: "我们设有多种类型的体验课",
		titleb: '帮您真正了解身体情况',
		titlec: '定制真正属于您的训练课程',
		product_list: []
	},
	showDetail: function(e) {
		var productId = e.currentTarget.id;
		wx.navigateTo({
			url: '/pages/experience/detail/detail?productId=' + productId
		})
	},
	onLoad: function(options) {
		let self = this;
		_.post('/rest/product/coupon', {}, function(res) {
			console.log(res);
			self.setData({
				product_list: res.data
			});
		});
	},
	onPullDownRefresh: function() {
		this.onLoad();
		wx.stopPullDownRefresh();
	}
})