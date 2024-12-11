require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
// Middleware to parse JSON
app.use(express.json());

//connect with mongoose database 
const url = process.env.MONGODB_URL;
console.log(url)
mongoose.connect(url)
.then(() =>{ console.log("connected to mongoose ") })
.catch(err => console.error("Can not connect to mongoose", err)) ;


//courses router
const allCoursesRouter = require('./routes/coursesRouter');
const allUsersRouter = require('./routes/usersRouter');

app.use("/api/courses/", allCoursesRouter);

//getting user router 
app.use("/api/users/", allUsersRouter);

//if the route is not existing  ;
app.all("*", (req, res, next) =>{
    res.json({status: "fail", code: 404, message: "This route is not exist"})
})
app.listen(4000, () =>{
    console.log('listening to post 4000')
})