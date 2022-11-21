import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = jwt.verify(token,process.env.JWT_SECRET)
        let dbuser = await User.findOneAndUpdate({email:user.email},{address:req.body.address , pincode:req.body.pincode, phone:req.body.phone, name:req.body.name})
  
        res.status(200).json({success:true})
    }
    else {
        res.status(400).json({error:"error"})
    }
}
export default connectDb(handler)