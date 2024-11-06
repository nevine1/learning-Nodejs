const http = require('http');
const fs = require('fs');
const _ = require('lodash')
const server = http.createServer((req, res) => {
    
    const num = _.random(0, 10)
    console.log(num)

    //once means use it only one time
    const greeting = _.once(() =>{
        console.log('hello lodash')
    })
    greeting();

    // Set header type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch (req.url) {
        case "/":
            path += "index.html"; 
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html"; 
            res.statusCode = 200;
            break;
        case "/about-bla":
            res.statusCode = 301; 
            res.setHeader('Location', '/about');
            res.end();
            break; 
        default: 
            path += "404.html";
            res.statusCode = 404; 
            break;       
    }

    // Read the file based on the computed `path` variable
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //res write data 
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on port 3000');
});
