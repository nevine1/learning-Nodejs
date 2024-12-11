const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    }, 
    lastName:{
        type: String,
        required: true,
    },
    email :{
        type: String,
        unique: true,
        required: true, 
        validate: [validator.isEmail, "Email can not be empty"]
    }, 
    password:{
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('User', userSchema)