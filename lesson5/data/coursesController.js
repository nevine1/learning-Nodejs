let { courses } = require('../data/courses')
const { body, validationResult } = require('express-validator')
const validationSchema =  () =>{
    return [
        body('title')
            .notEmpty()
            .isLength({min: 5})
            .withMessage('Course title must be at least 5 char'),
        body('price')
            .notEmpty()
        ]
}
const getAllCourses = (req, res) => { 

    res.json(courses); 
}

const addNewCourse = (req, res) => { 

   const errors = validationResult(req, res);
   if(!errors.isEmpty()){
       return res.status(400).json({error: errors.array()})
   }
   const { title, price } = req.body; 
   const newCourse = {id: courses.length + 1, ...req.body};
   courses.push(newCourse)
  
   res.json(newCourse)//return only the new course has been created
  // res.json(courses); //return all the courses 
}

const updateExistingCourse = (req, res) => {
    const courseId = parseInt(req.params.id) //parseInt to convert id to integer 
    const course = courses.find((course) => course.id === courseId);
console.log(courseId)
    if(!course){
        return res.status(400).json("course not found")
    }
    const updatedCourse = {...req.body};
    
    console.log(updatedCourse);
    res.json(updatedCourse);

}

const deleteExistingCourse = (req, res) =>{
    const courseId = parseInt(req.params.id);
    const newCourseList = courses.filter((course) =>course.id !== courseId);

    if(newCourseList.length === courses.length){
        return res.status(4000).json({error: "Course not found"});
    }

    res.json(newCourseList);
}

module.exports = {
    getAllCourses,
    addNewCourse,
    deleteExistingCourse,
    updateExistingCourse,
    validationSchema
}