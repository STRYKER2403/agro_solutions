import Product from "../../models/Product"
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {

        for (let i = 0; i < req.body.length; i++) {
            let prep = await Product.findOne({ slug: req.body[i].slug })
            if (prep) {
                res.status(400).json({ success: false, error: "Enter a unique Slug!!!" })
                return
            }

            let p = new Product({
                title: req.body[i].title,
                slug: req.body[i].slug,
                desc: req.body[i].description,
                img: req.body[i].imgLink,
                category: req.body[i].category,
                price: req.body[i].price,
                availableQty: req.body[i].availableQty,
            })
            await p.save();
        }
        res.status(200).json({ success: true })
    }
    else {
        res.status(400).json({ success: false, error: "This method is not allowed" })
    }
}
export default connectDb(handler)


