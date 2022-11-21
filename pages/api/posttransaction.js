import Order from "../../models/Order"
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose"
const PaytmChecksum = require('paytmchecksum');

const handler = async (req, res) => {
  
  // Validate paytm checksum
  let received_data = JSON.parse(JSON.stringify(req.body))

  var paytmChecksum = received_data.CHECKSUMHASH;
  delete received_data.CHECKSUMHASH;

  var isVerifySignature = PaytmChecksum.verifySignature(received_data, process.env.PAYTM_MKEY, paytmChecksum);
  if (!isVerifySignature) {
    res.status(500).send("Some Error Occured")
    return
  }

  // Update Status into Orders table after checking the transaction status
  let order;
  if (req.body.STATUS == 'TXN_SUCCESS') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Paid", paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID})
    let products = order.products
    for (let slug in products) {
      await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
    }
  }
  else if (req.body.STATUS == 'TXN_FAILURE') {
    order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Pending", paymentInfo: JSON.stringify(req.body), transactionid: req.body.TXNID })
    res.redirect("/", 200)
  }


  // initiate shipping
  // Redirect user to the order confirmation page
  res.redirect("/order?clearCart=1&id=" + order._id, 200)
  // res.status(200).json({ body:req.body })
}

export default connectDb(handler);
