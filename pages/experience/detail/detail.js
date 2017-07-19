var _ = require('../../../utils/tools');
Page({
    data: {
        current: 1,
        all: 0
    },
    change: function (e) {
        this.setData({
            current: e.detail.current + 1
        })
    },
    linkTo: function () {
        wx.navigateTo({
            url: '/pages/experience/order/order?productId=' + this.data.productId + '&productName=' + this.data.name + '&price=' + this.data.price
        })
    },
    onLoad: function (options) {
        let productId = options.productId;
        let self = this;
        var pages=getCurrentPages();
        console.log(self.options)

        if(self.options.vip){
            console.log(1)
            _.post('/rest/product/card/get', {
                product_id: productId
            }, function (res) {
                console.log(res);
                let product = res.data;
                _.setNavigationBarTitle(product.name);
                var combo = product.combo;
                var total = 0;
                for (var i = 0; i < combo.length; i++) {
                    total += Number(combo[i].price);
                }
                _.parseHtml(self, product.details);
                self.setData({
                    productId: productId,
                    name: product.name,
                    bannerImg: product.imgs,
                    all: product.imgs.length,
                    summary: product.summary,
                    price: product.price,
                    original_price: product.original_price,
                    sales_count: product.sales_count,
                    combo: product.combo,
                    total: total
                });
            });
        }else{
            _.post('/rest/product/coupon/get', {
                product_id: productId
            }, function (res) {
                console.log(res);
                let product = res.data;
                _.setNavigationBarTitle(product.name);
                var combo = product.combo;
                var total = 0;
                for (var i = 0; i < combo.length; i++) {
                    total += Number(combo[i].price);
                }
                _.parseHtml(self, product.details);
                self.setData({
                    productId: productId,
                    name: product.name,
                    bannerImg: product.imgs,
                    all: product.imgs.length,
                    summary: product.summary,
                    price: product.price,
                    original_price: product.original_price,
                    sales_count: product.sales_count,
                    combo: product.combo,
                    total: total
                });
            });
        }
       
    },
    onPullDownRefresh: function () {
        this.onLoad();
        wx.stopPullDownRefresh();
    }
})