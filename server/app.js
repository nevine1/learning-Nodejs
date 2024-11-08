const express = require('express');

// express app
const app = express();

//register view engine 
app.set('view engine', 'ejs')
//listen for requests
app.listen(3000)// return an instance of the server

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