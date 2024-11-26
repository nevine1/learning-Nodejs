const http = require('http');
const fs = require("fs")

const homePage = fs.readFileSync('./views/index.html', 'utf8')
const about = fs.readFileSync('./views/about.html', 'utf8')
const server = http.createServer((req, res) =>{
    console.log("hello http server")
    if(req.url === "/"){
        res.write(homePage)
    }else{
        res.write("This page is not found")
    }
    res.end();
})

server.listen(3001, 'localhost', () => {
    console.log('Hello my server ')
})