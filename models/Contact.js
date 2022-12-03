const mongoose  = require("mongoose");

const ContactSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true
    },

    phone: {
        type:String,
        required:true    
    },

    message:{
        type:String,
        required:true
    }
    
  },{timestamps:true});

// mongoose.model = {}
// if model exist use it else create it
module.exports = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
// export default mongoose.model('User', UserSchema);