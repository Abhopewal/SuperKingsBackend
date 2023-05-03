require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/user")
const port = process.env.PORT || 3000
const app = express();
require("./db")();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/api/v1/",userRoute);

app.listen(port,()=>{
    console.log(`listing on port ${port}`)
})
