const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

const mongodb = process.env.MONGODB