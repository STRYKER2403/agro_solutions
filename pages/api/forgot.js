import User from "../../models/User"
import Forgot from "../../models/Forgot"
import connectDb from "../../middleware/mongoose"
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
    if (req.method == 'POST') {

        // Send an email to the user
        if (req.body.sendMail) {

            let token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '2d' });
            
  
                let forgot = new Forgot({
                    email: req.body.email,
                    token: token
                })
                await forgot.save();

            let email = `We have sent you this email in response to your request to reset your password on Codeswear.com.

        To reset your password , please follow the link below:

        <a href="http://localhost:3000/forgot?token=${token}">Click here to reset your password</a>

        <br/><br/>

        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page.

        <br/><br/>`



            // const sendMail = () =>{
            //     const transporter = nodemailer.createTransport({
            //         host: 'smtp-mail.outlook.com',
            //         auth : {
            //             user : "test1200224@outlook.com",
            //             pass : "Ni,RUaz9Y#c5D^g"
            //         }
            //     })

            //     const options = {
            //         from: "test1200224@outlook.com",
            //         to: req.body.email,
            //         subject: "Reset Password",
            //         text: "Hello",
            //         html:email
            //     }

            //      transporter.sendMail(options, (error, info) =>{
            //         if(error) console.log(error)
            //         else console.log(info)
            //     })

            // }

            //  sendMail();



            let ress;
            const sendMail = () => {
                return new Promise((resolve, reject) => {
                    const transporter = nodemailer.createTransport({
                        host: 'smtp-mail.outlook.com',
                        auth: {
                            user: "test200224@outlook.com",
                            pass: "lePA@#123"
                        }
                    })

                    const options = {
                        from: "test200224@outlook.com",
                        to: req.body.email,
                        subject: "Reset Password",
                        text: "Hello",
                        html: email
                    }

                    transporter.sendMail(options, (error, info) => {
                        if (error) {
                            
                            ress = error
                            ress.success = false
                            resolve(ress)
                        }
                        else {
                            
                            ress = info
                            ress.success = true
                            resolve(ress)
                        }
                    })
                })
            }

            await sendMail();
            res.status(200).json(ress)

        }
        else {
            //reset User Password

            // Check if the user exists in the database
            let dbuser = await Forgot.findOne({ token: req.body.token })
       
            let { token } = dbuser

            if (req.body.token == token) {
                let user = await User.findOneAndUpdate({ email: dbuser.email }, { password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })
                if (user) {
                    res.status(200).json({ success: true })
                }
                else {
                    res.status(400).json({ success: false })
                }

            }
            else {
                res.status(400).json({ success: false })

            }
        }
    }
    else {
        res.status(400).json({ error: "error" })
    }
}
export default connectDb(handler)