let route = require("express").Router();
let loginController = require("../controller/authController")
const gameController = require("../controller/gameController")
const Auth = require("../middleware/auth");

route.get("/",(req,res)=>{
    return res.status(200).json({status:true,message:"Hello I am API",time:new Date().toDateString()})
})

route.post(`/login`,loginController.login);
route.post(`/register`,loginController.register);


//games route
route.get(`/games`,Auth,gameController.getGames);


module.exports = route;