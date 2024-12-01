/* const express = require('express'); */
require('dotenv').config();

const {MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const mongodbURL = process.env.URL
const client = new MongoClient("mongodb+srv://nevine:nodejs123456@cluster0.npjnh.mongodb.net/")



const main = async () => {
    await client.connect();
    console.log("connected successfully ");
    const db = client.db('Nodejs-codzone');//database already created called Nodejs-codzone
    const collections =   db.collection('node-courses'); //collection already created in the database 
    const data = await collections.find().toArray(); //
    console.log("data",data)
}

main();