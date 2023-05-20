const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    isLogin:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:"admin"
    }
},{timestamps:true});

let Admin = new mongoose.model("Admin",AdminSchema);

module.exports = Admin;