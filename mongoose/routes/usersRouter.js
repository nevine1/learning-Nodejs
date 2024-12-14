const express = require('express');
const router = express.Router();

const usersController = require('../data/users.controller');
const verifyToken = require('../middleware/verifyToken')
//get all uses 
router.get("/",verifyToken, usersController.getAllUsers); //before execute the get all users, first execute verify token 

router.post("/register", usersController.register);
router.get("/login", usersController.login);


module.exports = router;