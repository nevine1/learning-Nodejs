const express = require('express');
const router = express.Router();

const usersController = require('../data/users.controller');

//get all uses 
router.get("/", usersController.getAllUsers);

router.post("/register", usersController.register);
router.get("/login", usersController.login);


module.exports = router;