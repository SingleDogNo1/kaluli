var _ = require('../../../utils/tools');
var orderId;
var orderType;
Page({
    data: {
        gotit: true,
        orderId: '',
        orderType: ''
    },
    ling: function () {
        if (typeof wx.addCard === 'function') {
            console.log(orderType)
            let url = orderType == 'order_coupon' ? '/rest/order/coupon/draw' : '/rest/order/card/draw';
            _.post(url, {
                order_id: orderId
            }, function (res) {
                let cardList = res.data.cardList;
                wx.addCard({
                    cardList: cardList, // 需要添加的卡券列表
                    success: function (res) {
                        wx.navigateBack()
                        var cardList = res.cardList; // 添加的卡券列表信息
                        let successUrl = orderType == 'order_coupon' ? '/rest/order/coupon/success' : '/rest/order/card/success';
                        _.post(successUrl, {
                            order_id: orderId,
                            cardList: cardList
                        }, function (res) {
                            console.log(res)
                        });
                    }
                });
            });
        } else {
            _.showModal('领取失败', '当前微信版本过低,请升级后领取卡券');
        }
    },
    onLoad: function (options) {
        let self = this;
        orderId = options.orderId;
        orderType = options.orderType;
        console.log(orderType);
        _.post('/rest/order/get', { order_id: orderId, order_type: orderType }, function (res) {
            console.log(res);
            self.setData({
                msg: res.data
            });
        });
    }
})