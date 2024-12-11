
const { body, validationResult } = require('express-validator');
const User = require('../models/users.model');
const bcrypt = require('bcrypt');
/* const validationSchema = () => [
    body('title')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('Course title must be at least 5 characters'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
]; */

//get all users
const getAllUsers = async (req, res) => { 

    try{
        const query = req.query; 
        const limit = query.limit; 
        const page = query.page; 
        const skip = (page - 1 ) * limit;

        const users = await User.find({}, {"__v": false, "password": false }).limit(limit).skip(skip); //I do not need to return password and version

        return res.json({
            status: 'success',
            data: { users }, 
            code: 200
        })

    }catch(err){
        return res.json({ status: 'error', data: null,  message: err.message, code: 400})
    }
   
    
}

const register = async (req, res) => { 

   const errors = validationResult(req);

   if(!errors.isEmpty()){
       return res.status(400).json({status: "fail", data:  errors.array()})
   }

   try{
   

    const { firstName, lastName, email, password } = req.body;

    //check by email if the user exists or not 
    const existingUser = await User.findOne({email: email})

    if(existingUser){

        return res.status(400).json("This email is already registered");

        }else{

        //hashing password 
        const hashedPass = await bcrypt.hash(password, 10 );
            const newUser = new User({ firstName, lastName, email, password: hashedPass });
        
        await newUser.save();
       
        return res.json({ status: 'success', data: {user: newUser}, message: "New user added successfully" }); // or return all courses data: {courses}
   

        }
    

        
    }catch(err){

    return res.json({ status: 'error', data: null, message: err.message, code: 400});
   }  

}


const login = (req, res) => {}


module.exports = {
    getAllUsers,
    register,
    login
}