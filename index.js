const fs = require('fs')
fs.readFile('./files/lorem.txt','utf8', (err, data) => {
    if(err) throw err;
    console.log(data.toString())

})

process.on('uncaughtException',err =>{
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1)
})