
const express = require('express');
const app = express();

app.use(express.json());

const allCoursesRouter = require('./routes/coursesRouter')


app.listen(4000, () =>{
    console.log('listening to post 4000')
})