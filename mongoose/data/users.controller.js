
const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//const {} = require("../utils/generateJWT")

//get all users
const getAllUsers = async (req, res) => { 
//console.log("request headers's is", req.headers)
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

        //generating jwt to use it for login the registered new user
        const token = await  jwt.sign({
                    email: newUser.email,
                    id: newUser._id
                        }, 
                    process.env.JWT_SECRET_KEY, 
                    { expiresIn: '10minutes'}
                    );
        newUser.token = token;
        console.log(token)
        await newUser.save();
       console.log(token)
        
       return res.json({ status: 'success', data: {user: newUser}, message: "New user added successfully" }); // or return all courses data: {courses}
     
    }
    

        
    }catch(err){

    return res.json({ status: 'error', data: null, message: err.message, code: 400});
   }  

}


const login = async (req, res) => {
    console.log("request headers is:", req.headers)
    try{
        const { email, password } = req.body;

        if(!email && !password ){

          
            return res.json({ status: 'error', data: null, message: "Email and password should not be empty"})
        
        }else{
            const user = await User.findOne({email: email});

            if(!user){
                return res.json({ status: 'error', data: null, message: "This user not found"})
            }
            //to get the password from the database hashed password
            const matchedPassword = await bcrypt.compare( password, user.password ); // user.password it comes from the req.body password

            if(user && matchedPassword){
               //login in successfully
                //return res.json({ status: 'success', data:{user }, message: "user logged in successfully"})

                //return the token 
                const token = await  jwt.sign({
                    email: user.email,
                    id: user._id
                        }, 
                    process.env.JWT_SECRET_KEY, 
                    { expiresIn: '10minutes'}
                    );
                return res.json({ status: 'success', data:{ token }, message: "user logged in successfully"})
            }
        }
        
        
    }catch(err){
        return res.json({ status: 'error', message: err.message, code: 400})
    }
}


module.exports = {
    getAllUsers,
    register,
    login
}