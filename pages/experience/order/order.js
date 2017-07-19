var _ = require('../../../utils/tools');
Page({
	data: {
		productId: '',
		productName: '',
		price: '',
		length: 1,
		mobile: '',
		realname: '',
		sex: '男'
	},
	changeSex: function() {
		if(this.data.sex == '男'){
			this.setData({
				sex:'女'
			})
		} else{
			this.setData({
				sex:'男'
			})
		}
	},
	getTel: function(e) {
		var v = e.detail.value;
		this.setData({
			mobile: v
		})
	},
	getName: function(e) {
		var v = e.detail.value;
		this.setData({
			realname: v
		})
	},
	linkTo: function() {
		let self = this;
		var realname = this.data.realname;
		var mobile = this.data.mobile;
		var sex = this.data.sex;
        console.log(realname,mobile,sex)

        var pages = getCurrentPages();
        var prePage = pages[pages.length - 2];
        var realURL;
		if(mobile == '') {
			return
		} else if(mobile.length < 11) {
			_.showError('请输入正确的11位手机号码');
			return
		}
		if(realname == '') {
			_.showError('请输入真实姓名');
			return
		}
        if (prePage.options.vip){
            realURL ='/rest/order/card/pay'
        }else{
            realURL = '/rest/order/coupon/pay'
        }
		_.post(realURL, {
			productId: self.data.productId,
			mobile: mobile,
			realname: realname,
			sex: sex
		}, function(res) {
			var config = res.data.payConfig;
			var order_id = config.order_id;
			var order_type = config.order_type;
            console.log(order_id,order_type)
			wx.requestPayment({
				'timeStamp': config.timeStamp,
				'nonceStr': config.nonceStr,
				'package': config.package,
				'signType': config.signType,
				'paySign': config.paySign,
				'success': function(res) {
					wx.showToast({
						tilte: '支付成功',
						icon: 'success',
						duration: 2000
					});

                    _.post('/rest/user/update', {
                        mobile: self.data.mobile,
                        realname: self.data.realname,
                        sex: self.data.sex
                    }, function (res) {
                        console.log(res)
                    })


					wx.switchTab({
						url: '/pages/mine/me/me',
						success: function(res) {
							wx.navigateTo({
								url: '/pages/experience/showorder/showorder?orderId=' + order_id + '&orderType=' + order_type
							})
						}
					})
				},
				'fail': function(res) {
					_.showToast('支付失败');
				}
			})
		});
	},
	onLoad: function(options) {
		var self = this;
		this.setData({
			productId: options.productId,
			productName: options.productName,
			price: options.price
		})
		_.post('/rest/user/get', {}, function(res) {
			console.log(res.data)
			var msg = res.data;
			if(_.isEmpty(msg.sex)){
				msg.sex = '男';
			}
			self.setData({
				mobile: msg.mobile,
				realname: msg.realname,
				sex: msg.sex
			})
		})

	}



	/*// 增加减少订单数量
    sub: function() {
        var length = this.data.length;
        length--;
        if(length < 1) {
            length = 1
        }
        this.setData({
            length: length
        })
    },
    add: function() {
        var length = this.data.length;
        length++;
        this.setData({
            length: length
        })
    },*/

})