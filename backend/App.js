const express = require('express')
const connectDatabase = require('./db/Database');
const ErrorHandler = require('./utils/errorhandler');
const cookieParser = require('cookie-parser');
const app = express()
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')





app.use(express.json());
app.use(cookieParser());
app.use("/",express.static("uploads"))
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
//config

if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:'backend/config/.env'
    })
}

//import router

const user = require('./controller/user')

app.use("./api/v2/user",user)

connectDatabase();

app.use(ErrorHandler);

module.exports = app;