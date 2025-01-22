const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors=require('cors')
const user = require("./controller/user");


// it's for ErrorHandling
app.use(ErrorHandler);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors())
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "backend/config/.env",
    });
};
//import Routes


app.use("/api/v2/user", user);


module.exports = app;
