
const express = require('express');
const app = express();

app.use(express.json());

const allCoursesRouter = require('./routes/coursesRouter');

//use courses router as a middleware to make it more readable
app.use("/api/courses/", allCoursesRouter);//any request has "/", makes it use the courses router (allCoursesRouter) 
app.listen(4000, () =>{
    console.log('listening to post 4000')
})