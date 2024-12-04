const express = require('express');

const mongoose = require('mongoose');
const app = express();
app.use(express.json());

//connect with mongoose database 
//const url = "mongodb+srv://nevine:nodejs123456@cluster0.npjnh.mongodb.net/"; //I can add the database name at the same line as the
const url = "mongodb+srv://nevine:nodejs123456@cluster0.npjnh.mongodb.net/Nodejs-codzone"; //Nodejs-codzone" is the database name
; 
mongoose.connect(url).then(() =>{
    console.log("connected to mongoose ")
});

const allCoursesRouter = require('./routes/coursesRouter');


app.use("/api/courses/", allCoursesRouter);
app.listen(4000, () =>{
    console.log('listening to post 4000')
})