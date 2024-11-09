require("dotenv").config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
// express app
const app = express();

//connect to mongoDB
//const dbURI="mongodb+srv://user1database:database1@node-tutorial.myedr.mongodb.net/?retryWrites=true&w=majority&appName=nodeTutorial"
const dbURI= "mongodb+srv://user1database:database1@nodetutorial.myedr.mongodb.net/?retryWrites=true&w=majority&appName=nodeTutorial"
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))
//register view engine 
app.set('view engine', 'ejs')
//listen for requests
//app.listen(3000)// return an instance of the server

app.get('/', (req, res) => {

    const blogs= [
        {'title':'blog1', 'snippet': "This is the first blog here "},
        {'title':'blog2', 'snippet': "This is the second blog here "},
        {'title':'blog3', 'snippet': "This is the third blog here "},
    ];
    res.render(`index`, { title: 'Home', blogs})
    //express looks inside views folder 
    // find index and use ejs view engine and 
    // render index page and sending back to the browser
    //and the same with other pages about, 404, ....

});

app.get('/about', (req, res) =>{
    res.render('about', {title: 'About Page'})
})

app.get('/blogs/create', (req, res) =>{
    res.render('create', {title: 'Create Page'})
})

//404 page 
app.use((req, res) =>{
    res.status(404).render('404', {title: '404'})
})

//connect the model blog to the database and
app.get('/add-blog', (req, res) =>{
    const blog = new Blog({
        title: "New Blog", 
        snippet: "about me new blog ", 
        body: "moreeeeeeeeee about my new blog "
    });
    blog.save()
    .then((result) =>{
        res.send(result)
    }).catch((err) =>console.log(err))//this blog here is the one created above with the title, ... snippent ..and body : '''''
})