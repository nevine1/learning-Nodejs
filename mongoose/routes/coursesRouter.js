const express = require('express');
const router = express.Router();

const coursesController = require('../data/coursesController');

//get all courses
router.get("/", coursesController.getAllCourses);

//add new post ; 
router.post("/", 

    coursesController.validationSchema(),

    coursesController.addNewCourse
   );

//get course by id
router.get("/:id", coursesController.getCourseById)
//updating course using course Id;
router.patch("/:id", coursesController.updateExistingCourse)

//deleting course using course id ;
router.delete("/:id", coursesController.deleteExistingCourse);

module.exports = router;