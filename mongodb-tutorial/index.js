/* const express = require('express'); */
require('dotenv').config();

const {MongoClient } = require('mongodb');
/* const url = 'mongodb://localhost:27017';
const mongodbURL = process.env.URL */
const client = new MongoClient("mongodb+srv://nevine:nodejs123456@cluster0.npjnh.mongodb.net/")



const main = async () => {
    await client.connect();
    console.log("connected successfully ");

    //if u have a database called: Nodejs-codzone, connect with it 
    //if there is no database called, Nodejs-codzone , so create it 
    const db = client.db('Nodejs-codzone');

    //if there is a collection called: node-courses, connect with it , 
    //if there is no collection called, Nodejs-codzone, create it
    const collection =   db.collection('node-courses'); 

    //to insert new data (like adding new row in sql ) by using: insertOne
     /* await collection.insertOne(
        {
            title: "html5 & CSS5", 
            price: "350$"
        }
    ) */
    
    //insert many items at the same time using: insertMany 
    await collection.insertMany(
       [ 
        {
            title: "html5", 
            price: "200$"
        }, 
        {
            title: "CSS5", 
            price: "125$"
        }
        ]
    )

    //get query for the data in the collection called node-courses
    
    const data = await collection.find().toArray(); //
    console.log("data",data)
}

main();