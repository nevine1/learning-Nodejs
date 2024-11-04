const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises
const logEvents = async () =>{
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuidv4}`
}

logEvents();
console.log(format(new Date, 'yyyy-MM-dd\tHH:mm:ss'));
console.log(uuidv4())