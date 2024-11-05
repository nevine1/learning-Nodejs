const http = require('http');

const server = http.createServer((req, res) => {
    console.log('request sent')
    console.log(req.method, req.url);
    
    //set header types 
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>This is res header</h1>');
    res.write('<p>Hello response </p>');
    res.end();
    console.log(res.headers);
    
})

server.listen(3000, 'localhost', () =>{
    console.log('listen to server is done')
})