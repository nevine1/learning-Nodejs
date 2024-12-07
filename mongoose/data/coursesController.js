
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
        //const courses = await Course.find();
        const courses = await Course.find({}, {"__v": false, "price": false})
        //Course.find({}, {"__v": false, "price": false})
        //{} means fetch all the data
        //the second "__v": false, means do not fetch __v , Price: false means do not fetch price 

        //modifying res by using JSend
        //return res.json({ status: "success", data: {courses: courses} }); returned data is an object
        return res.json({ status: "success", data: {courses} });

     } catch (err){
        console.error("Can not get the course", err)
     }
    
}

const addNewCourse = async (req, res) => { 

   const errors = validationResult(req);

   if(!errors.isEmpty()){
       return res.status(400).json({status: "fail", data:  errors.array()})
   }

   try{

        const { title, price } = req.body;

        const newCourse = new Course({ title, price } );
        
        await newCourse.save();

        //return res.json({ status: 'success', data: { courses: courses } });
        return res.json({ status: 'success', data: { courses: newCourse} }); // or return all courses data: {courses}

    }catch(err){

    return res.json({ status: 'error', data: null, message: err.message, code: 40});
   }  

}
const getCourseById = async (req, res) => {
  
    try{
        const id = req.params.courseId
        console.log(id)
        const course = await Course.findById(req.params.id);
        return res.json({ status: "success", data: { course }});

        if(!course){
            return res.status(404).json({ status: "failure", data: {course: "course not found"}})
        }

        }catch(err){
            return res.json({ status: "error", data : null , message: err.message, code: 400})
        }

    }


const updateExistingCourse = async (req, res) => {

    try{
        const id = req.params.id; 
        console.log(id)
        const updateCourse = await Course.findByIdAndUpdate(id, {$set: {...req.body}});
        return res.json({ status: 'success', data: { updateCourse }});

    }catch(err){

        return res.status(400).json({ status: "error", data: { course: null }})
    }
   

}

const deleteExistingCourse = async (req, res) =>{
    
    try{
        const id = req.params.id; 

         await Course.findByIdAndDelete(id);
         
         // to return the all courses after delete one course; 
         const courses = await Course.find();

        return res.json({ status: "success", data: null}); //we can return null or return all courses
        //return res.json({ status: "success", data: { courses }})
    }catch(err){
        return res.json({ status: "error", data: null, message: err.message, code: 400})
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