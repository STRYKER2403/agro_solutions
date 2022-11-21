import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = jwt.verify(token, process.env.JWT_SECRET)
        let dbuser = await User.findOne({ email: user.email })
        var bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        if (req.body.password == decryptedData && req.body.npassword == req.body.cpassword) {
            await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString() })
            res.status(200).json({ success: true })
            return
        }
        else {
            res.status(400).json({ success: false })
        }

    }
    else {
        res.status(400).json({ error: "error" })
    }
}
export default connectDb(handler)