const https = require('https');
import Order from "../../models/Order"
import connectDb from "../../middleware/mongoose"
import Product from "../../models/Product";
import pincodes from "../../pincodes.json"
const PaytmChecksum = require('paytmchecksum');


const handler = async (req, res) => {
    if (req.method == 'POST') {

        // Check if the pincode is serviceable
        if (!Object.keys(pincodes).includes(req.body.pincode)) {
            res.status(200).json({ success: false, "error": "The pincode you have entered is not servicable!", cartClear: false})
            return
        }


        // check if the cart is tampered with
        let product, sumTotal = 0;
        let cart = req.body.cart;
        if (req.body.subTotal <= 0) {
            res.status(200).json({ success: false, "error": "Cart Empty! Please build your cart and try again!", cartClear: false})
            return
        }
        for (let item in cart) {
            sumTotal += cart[item].price * cart[item].qty;
            product = await Product.findOne({ slug: item })
            // check if the cart items are out of stock 
            if (product.availableQty < cart[item].qty) {
                res.status(200).json({ success: false, "error": "Some items in your cart went out of stock . Please try again!", cartClear: true})
                return
            }

            if (product.price != cart[item].price) {
                res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please try again!", cartClear: true})
                return
            }
        }
        if (sumTotal !== req.body.subTotal) {
            res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please try again!", cartClear: true})
            return
        }



        // check if the details are valid
        if (req.body.phone.length !== 10 || isNaN(req.body.phone)) {
            res.status(200).json({ success: false, "error": "Please enter your 10 digit phone number!", cartClear: false})
            return
        }
        if (req.body.pincode.length !== 6 || isNaN(req.body.pincode)) {
            res.status(200).json({ success: false, "error": "Please enter your 6 digit pincode!", cartClear: false})
            return
        }

        //Initiate and Order corresponding to this order id
        let order = new Order({
            email: req.body.email,
            orderId: req.body.oid,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode : req.body.pincode,
            phone: req.body.phone,
            name: req.body.name,
            amount: req.body.subTotal,
            products: req.body.cart
        })

        await order.save()

        // Insert an entry in the Orders table with status as pending 
        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "WEBSTAGING",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.subTotal,
                "currency": "INR",
            },
            "userInfo": {
                // "custId": req.body.cid,
                "custId": req.body.email,
            },
        };

        /*
        * Generate checksum by parameters we have in body
        * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        */
        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);


        const requestAsync = () => {
            return new Promise((resolve, reject) => {
                var options = {

                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',

                    /* for Production */
                    // hostname: 'securegw.paytm.in',

                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        let ress = JSON.parse(response).body
                        ress.success = true
                        ress.cartClear = false
                        resolve(ress)
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })
        }

        let myr = await requestAsync();
        res.status(200).json(myr)
    }
}

export default connectDb(handler);