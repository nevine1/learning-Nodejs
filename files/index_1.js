const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, `files`, `first.txt`),'utf8', (err, data) => {
    if(err) throw err;
    console.log(data.toString())

})

fs.writeFile(path.join(__dirname, `files`, `vena.txt`), 'Nice to meet y  nevine',  (err) =>{
    if(err) throw err;
    console.log('file write complete');
})

fs.appendFile(path.join(__dirname, `files`, `newTest.txt`), `Hello append file`, (err) =>{
    if(err) throw err;
    console.log('file append complete');
})
process.on('uncaughtException',err =>{
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1)
})