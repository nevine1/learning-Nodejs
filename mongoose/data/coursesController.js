
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
        const courses = await Course.find();
        return res.json(courses);

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
        const id = req.params.courseId
        console.log(id)
        const course = await Course.findById(req.params.id);
        return res.json(course)

        if(!course){
            return res.status(400).json("course not found")
        }

        }catch(err){
            console.error("can not find this id:", err)
        }

    }


const updateExistingCourse = async (req, res) => {

    try{
        const id = req.params.id; 
        console.log(id)
        const updateCourse = await Course.findByIdAndUpdate(id, {$set: {...req.body}});
        return res.json(updateCourse);

    }catch(err){

        return res.status(400).json({error: err})
    }
   

}

const deleteExistingCourse = async (req, res) =>{
    
    try{
        const id = req.params.id; 
         await Course.findByIdAndDelete(id);
         
         // to return the all courses after delete one course; 
         const courses = await Course.find();
        return res.json(courses)
    }catch(err){
        return res.json({error: err})
    }
}

module.exports = {
    getAllCourses,
    addNewCourse,
    getCourseById,
    deleteExistingCourse,
    updateExistingCourse,
    validationSchema
}