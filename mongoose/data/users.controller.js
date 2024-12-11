
const { body, validationResult } = require('express-validator');
const User = require('../models/users.model');
/* const validationSchema = () => [
    body('title')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('Course title must be at least 5 characters'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
]; */

//get all courses route
const getAllUsers = async (req, res) => { 

    try{
        const query = req.query; 
        const limit = query.limit; 
        const page = query.page; 
        const skip = (page - 1 ) * limit;

        const users = User.find({}, {"__v": false}).limit(limit).skit(skip);
        
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

        const newUser = new User({ firstName, lastName, email, password} );
        
        await newUser.save();

       
        return res.json({ status: 'success', data: { courses: newUser} }); // or return all courses data: {courses}

    }catch(err){

    return res.json({ status: 'error', data: null, message: err.message, code: 40});
   }  

}


const login = (req, res) => {}


module.exports = {
    getAllUsers,
    register,
    login
}