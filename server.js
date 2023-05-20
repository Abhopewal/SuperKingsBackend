require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/user")
const adminRoute = require("./routes/admin");
const cors = require("cors");
const port = process.env.PORT || 3000
const app = express();
require("./db")();


app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use("/api/v1",userRoute);
app.use("/api/v1",adminRoute);

app.listen(port,()=>{
    console.log(`listing on port ${port}`)
})
