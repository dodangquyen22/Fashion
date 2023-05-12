const Product = require("./modulers/Product");
const User = require("./modulers/User");
const Order = require("./modulers/Order");
const request = require('request');
const moment = require('moment');
const crypto = require('crypto');

class CheckoutController {
    view(req, res, next) {
        Product.find({
                _id: {
                    $in: req.user.cart.map(x => x.product_id)
                }
            }).lean()
            .then(products => {
                products.map(x => {
                    req.user.cart.forEach(y => {
                        if (x._id && y.product_id && x._id.toString() == y.product_id.toString()) {
                            x.quantity = y.quantity;
                        }
                    });
                })
                res.render('checkout', {
                    user: req.user,
                    products: products
                })
            })
            .catch(error => next(error));
    }
    async order(req, res, next) {
        let cart = req.user.cart;
        let totalPrice = 0
        let phoneNumber = req.user.phoneNumber;
        let address = req.user.address;
        let prod_find = await Product.find({
            _id: {
                $in: req.user.cart.map(x => x.product_id)
            }
        }).lean()
        if (!prod_find) {
            throw new Error()
        }
        cart.map(x => {
            prod_find.forEach(y => {
                if (x.product_id.toString() == y._id.toString()) {
                    x.price = parseInt(y.price);
                    totalPrice += x.price * x.quantity;
                }
            })
        })
        let new_order = await new Order({
            customer_id: req.user._id,
            products: cart,
            total: totalPrice
        })
        await new_order.save();
        if (!req.user.phoneNumber && req.body.phonenumber != "") {
            phoneNumber = req.body.phonenumber
        }
        if (!req.user.address && req.body.address) {
            address =req.body.address
        }
        await User.updateOne(
            {
                _id: req.user._id
            },
            {
                phoneNumber: phoneNumber,
                address: address
            }
        ).lean();
        let form = {
            app_id: 2554,
            app_user: req.user._id.toString(),
            app_trans_id: `${moment().format('YYMMDD')}_${new_order._id.toString()}`,
            app_time: Date.now(),
            amount: totalPrice,
            item: JSON.stringify(cart),
            description: "INT2208 - Thanh toan hoa don",
            embed_data: JSON.stringify({
                order_id: new_order._id.toString(),
                redirecturl: "http://localhost:3000/checkout/redirect"
            }),
            bank_code: "",
            mac: null,
            // callback_url: "http://localhost:3000/checkout/callback" // Internet reachable callback URL
        }
        const hash = crypto.createHmac('sha256', 'sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn')

        // updating data
        .update(form.app_id + '|' + form.app_trans_id + '|' + form.app_user + '|' + form.amount + "|" + form.app_time + '|' + form.embed_data + "|" + form.item)

        // Encoding to be used
        .digest('hex');
        form.mac = hash;
        request.post("https://sb-openapi.zalopay.vn/v2/create", {
            form: form,
            json: true
        }, function(e, r, result) {
            console.log(result)
            if (result.return_code == 1) {
                res.redirect(result.order_url)
            } else {

            }
        })
    }
    async redirectAfterPaymentComplete(req, res, next) {
        let data = req.query;
        let checksumData = data.appid + '|' + data.apptransid + '|' + data.pmcid + '|' + data.bankcode + '|' + data.amount + '|' + data.discountamount + '|' + data.status;
        let checksum = crypto.createHmac('sha256', 'trMrHtvjo6myautxDUiAcYsVtaeQ8nhf')

        // updating data
        .update(checksumData)

        // Encoding to be used
        .digest('hex');

        if (checksum != data.checksum) {
            res.sendStatus(400);
        } else {
            let order = await Order.updateOne({
                _id: data.apptransid.substring(7)
            }, {
                purchased: true
            })
            if (!order) {
                throw new Error();
            }
            if (order.acknowledged && order.modifiedCount == 1) {

            } else {
                throw new Error();
            }
            let user = await User.updateOne({
                _id: req.user._id
            }, {
                cart: []
            })
            if (!user) {
                throw new Error();
            }
            if (user.acknowledged && user.modifiedCount == 1) {
                // kiểm tra xem đã nhận được callback hay chưa, nếu chưa thì tiến hành gọi API truy vấn trạng thái thanh toán của đơn hàng để lấy kết quả cuối cùng
                res.redirect("/checkout/thankyou");
            }
        }
    }
    thankyou(req, res, next) {
        res.render('purchased', {
            user: req.user
        })
    }
}

module.exports = new CheckoutController();