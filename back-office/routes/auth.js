const express = require('express');
const route= express.Router();
const controller = require("../controllers/auth");
route.post('/signIn',controller.signIn);
module.exports = route;