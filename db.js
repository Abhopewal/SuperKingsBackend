const mongoose = require("mongoose");

let db = () => {
    mongoose.connect('mongodb://localhost:27017/superkings').then((res) => {
        console.log("connection success...")
    }).catch((err) => {
        console.log("connection faild")
    })
}
module.exports = db;