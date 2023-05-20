let route = require("express").Router();
const authController = require("../controller/adminController/authController");
const usersController = require("../controller/adminController/usersController");
const gameController = require("../controller/adminController/gameContoller.js");
const adminAuth = require("../middleware/adminAuth");


route.get("/admin",(req,res)=>{
    return res.status(200).json({status:true,message:"Admin API Superrking",time:new Date().toDateString()})
});



//auth routes
route.post(`/admin/login`,authController.login);



//users routes
route.get(`/admin/user`,adminAuth,usersController.getUsers);



//game routes
route.post(`/admin/game`,adminAuth,gameController.createGame);
route.get(`/admin/game`,adminAuth,gameController.getGame);

module.exports = route;