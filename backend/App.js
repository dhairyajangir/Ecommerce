const express = require('express')
const connectDatabase = require('./db/Database');
const ErrorHandler = require('./utils/errorhandler');
const app = express()



//config

if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:'backend/config/.env'
    })
}


connectDatabase();

app.use(ErrorHandler);

module.exports = app;