const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    referralId:{
        type:String,
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true});

let User = new mongoose.model("User",UserSchema);

module.exports = User;