
import express from 'express'
const app = express();


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

app.listen(4000, () =>{
    console.log('listening to post 4000')
})