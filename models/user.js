const mongoose = require('mongoose');
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
    }
},{
    timestamps:true // store time when the account is created and last updated
});

const User=mongoose.model('User',userSchema);
module.exports=User;