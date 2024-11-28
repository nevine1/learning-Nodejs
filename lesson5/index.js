
const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator')
app.use(express.json());

const courses = [
    { 
        id: 1, 
        title: "js course", 
        price: 1200
    }, {
        id: 2, 
        title: "react js", 
        price: 400
    }
]

app.get("/api/courses/:id", (req, res) => { 
    const id = parseInt(req.params.id); 
    const course = courses.find((course) => course.id === id);

    if (!course) {
        return res.status(404).json({ error: "Course not found" }); 
    }

    res.json(course); 
});
app.post("/api/courses", 
    body('title')
        .notEmpty()
        .isLength({min: 5})
        .withMessage('Course title must be at least 5 char'),
    body('price')
        .notEmpty(),
(req, res) => { 

    const errors = validationResult(req, res);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    const { title, price } = req.body; 
    const newCourse = {id: courses.length + 1, ...req.body};
    courses.push(newCourse)
   
    res.json(newCourse)//return only the new course has been created
   // res.json(courses); //return all the courses 
})

app.patch("/api/courses/:id", (req, res) =>{
    const courseId = parseInt(req.params.id) //parseInt to convert id to integer 
    const course = courses.find((course) => course.id === courseId);

    if(!course){
        return res.status(400).json("course not found")
    }
    const updatedCourse = {...req.body};
    console.log(updatedCourse);
    res.json(updatedCourse);

})

app.post("/api/courses", (req, res)=>{

})
//create new course 
app.post("/api/courses", (req, res) =>{
    console.log(req.body);//the result is undefined , so middleware should be added (app.use(express.json())) 
    const { title, price } = req.body; 
    const newCourse ={id : courses.length + 1, ...req.body}
    courses.push(newCourse);

    //res.status(200).statusMessage("new course created successfully").json(courses);
    res.json(courses)
})

app.listen(4000, () =>{
    console.log('listening to post 4000')
})