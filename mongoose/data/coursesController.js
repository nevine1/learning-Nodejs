/* let { courses } = require('../data/courses') */
const { body, validationResult } = require('express-validator');
const Course = require('../models/courses.model');
const validationSchema = () => [
    body('title')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('Course title must be at least 5 characters'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
];

//get all courses route
const getAllCourses = async (req, res) => { 

     try{
        const course = await Course.find();
        return res.json();

     } catch (err){
        console.error("Can not get the course", err)
     }
    
}

const addNewCourse = async (req, res) => { 

   const errors = validationResult(req);

   if(!errors.isEmpty()){
       return res.status(400).json({error: errors.array()})
   }

   try{

    const { title, price } = req.body; 
    const newCourse = new Course({ title, price } );
    await newCourse.save();
    return res.status(200).json(newCourse)

   }catch(err){

    console.error("Can not add a new course", err);
   }
   
   

}
const getCourseById = async (req, res) => {
  
    try{
        const course = await Course.findById(req.params.id);
        return res.json(course)

        if(!course){
            return res.status(400).json("course not found")
        }
        }catch(err){
            console.error("can not find this id:", err)
        }

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
    getCourseById,
    deleteExistingCourse,
    updateExistingCourse,
    validationSchema
}