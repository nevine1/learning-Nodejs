const express = require('express');
const router = express.router();

const coursesController = require('../data/coursesController');

router.get("/api/courses/:id", coursesController.getAllCourses);

//create new post ; 
router.post("/api/courses", 

    coursesController.newCourseValidation,

   coursesController.addNewCourse);


//updating course using course Id;
router.patch("/api/courses/:id", coursesController.updateExistingCourse)

//deleting course using course id ;
router.delete("/api/courses/:id", coursesController.deleteExistingCourse)