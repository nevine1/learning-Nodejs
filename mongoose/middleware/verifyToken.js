const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
   const authHeader = req.headers['Authorization'] || req.headers['authorization'];

   //check if there is not authHeader(this persons is not logged in)
   if(!authHeader){
    return res.status(401).json('token is required');
   }
   
   const token = authHeader.split(' ')[1];

   try{

    //to verify this token if it is right or not , use the jwt verify
   const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
   console.log('token is: ', decodedToken)
   next();
   }catch(err){
    return res.status(401).json({status: "error", message: err.message});
   }
   
}

module.exports = verifyToken;