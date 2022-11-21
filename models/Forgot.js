const mongoose  = require("mongoose");

const ForgotSchema = new mongoose.Schema({

    email: {
        type:String,
        required:true
    },

    token: {
        type:String,
        required:true,
        unique:true    
    }
    
  },{timestamps:true});

// mongoose.model = {}
// if model exist use it else create it
module.exports = mongoose.models.Forgot || mongoose.model('Forgot', ForgotSchema);
// export default mongoose.model('User', UserSchema);