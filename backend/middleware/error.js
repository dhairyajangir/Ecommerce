const ErrorHandler = require("../utils/errorhandler")


module.exports=(err,req,res,next) =>{
    err.statusCode = err.statusCode||500;
    err.message=err.message || "Internal Server Error"


    if(err.name === "castError"){

        const message = `Resource not found with this id...Invalid ${err.path}`;
        err = new ErrorHandler(message,400)

    }



    // Duplicate key error


    if(err.code === 11000){

        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`

        err = new ErrorHandler(message,400)



    // wrong jsonwebtoken
    if(err.name === "jsonWebTokenError"){
        const message = `your url is invalid try again`
        err = new ErrorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })


    }
}
