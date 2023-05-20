let route = require("express").Router();
const authController = require("../controller/adminController/authController");
const usersController = require("../controller/adminController/usersController");
const adminAuth = require("../middleware/adminAuth");


route.get("/admin",(req,res)=>{
    return res.status(200).json({status:true,message:"Admin API Superrking",time:new Date().toDateString()})
});

route.post(`/admin/login`,authController.login);

route.get(`/admin/getUsers`,adminAuth,usersController.getUsers);

module.exports = route;