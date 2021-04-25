const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAT_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        uinque:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type: String 
    }
},{
    timestamps:true // store time when the account is created and last updated
});

let storage = multer.diskStorage({ // this is to store the picture
    destination: function (req, file, cb) { // cb is callback
      cb(null, path.join(__dirname,'..',AVATAT_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()); // file.fieldname will be avatar
    }
  });

// static function
userSchema.statics.uploadAvatar = multer({ storage : storage }).single('avatar'); // single is used to save only one instance
userSchema.statics.aratarPath  = AVATAT_PATH;

const User = mongoose.model('User',userSchema);
module.exports=User;