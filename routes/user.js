let route = require("express").Router();
let loginController = require("../controller/authController")


route.post(`/login`,loginController.login);
route.post(`/register`,loginController.register);

module.exports = route;