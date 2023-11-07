const express = require("express");
const route = express.Router();
const auth_controller = require("../controllers/auth_controller");

route.post("/login", auth_controller.user_login);

module.exports = route;
