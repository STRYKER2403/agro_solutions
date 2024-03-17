import Contact from "../../models/Contact"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {

        const {name,phone,message} = req.body;         
        let c = new Contact({name,phone,message})
        await c.save()

        res.status(200).json({success : "success"})
    }
    else {
        res.status(400).json({error : "This method is not allowed"})
    }
}
export default connectDb(handler);  