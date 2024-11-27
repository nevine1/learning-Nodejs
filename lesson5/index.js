
const express = require('express');
const app = express();

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
app.get("/api/courses", (req, res) => { //localhost:4000/api/courses
    res.json(courses);
})

app.get("/api/courses/:id", (req, res) => { 
    const id = parseInt(req.params.id); // Convert `id` to a number
    const course = courses.find((course) => course.id === id);

    if (!course) {
        return res.status(404).json({ error: "Course not found" }); // Send a 404 response
    }

    res.json(course); // Send the course data only if it exists
});

//create new course 
app.post("/api/courses", (req, res) =>{
    console.log(req.body);//the result is undefined , so middleware should be added (app.use(express.json())) 
    const { title, price } = req.body; 
    courses.push({id : courses.length + 1, ...req.body});

    res.json(courses);
})

app.listen(4000, () =>{
    console.log('listening to post 4000')
})