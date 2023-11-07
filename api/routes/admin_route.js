const express = require("express");
const route = express.Router();
const auth_controller = require("../controllers/auth_controller");

route.post("/adminLogin", auth_controller.admin_login);

module.exports = route;
