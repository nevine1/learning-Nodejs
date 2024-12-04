let { courses } = require('../data/courses')
const { body, validationResult } = require('express-validator');
const Course = require('../models/courses.model');
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
const getAllCourses = async (req, res) => { 
     const courses = await Course.find();
    res.json(courses); 

    /* try {
        const courses = await Course.find();
        console.log('Courses retrieved:', courses);
        res.json(courses);
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ error: 'Failed to fetch courses' });
    } */
}

const addNewCourse = async (req, res) => { 

   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({error: errors.array()})
   }
   const { title, price } = req.body; 
   const newCourse = new Course(req.body);
   await newCourse.save();
   return res.status(200).json(newCourse)
   

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