const mongoose = require("mongoose");

let db = () => {
    mongoose.connect('mongodb+srv://some:some@cluster0.mgkhg.mongodb.net/super?retryWrites=true&w=majority').then((res) => {
        console.log("connection success...")
    }).catch((err) => {
        console.log("connection faild")
    })
}
module.exports = db;