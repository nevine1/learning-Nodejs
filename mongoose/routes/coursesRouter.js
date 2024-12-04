const express = require('express');
const router = express.Router();

const coursesController = require('../data/coursesController');

router.get("/", coursesController.getAllCourses);

//create new post ; 
router.post("/", 

    coursesController.validationSchema,

   coursesController.addNewCourse);


//updating course using course Id;
router.patch("/:id", coursesController.updateExistingCourse)

//deleting course using course id ;
router.delete("/:id", coursesController.deleteExistingCourse);

module.exports = router;