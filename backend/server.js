if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({
        path:'config/.env'
    })
}


const app = require('./App');



//Handling uncaught exceptions

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log('shutting down the server for handling uncaught exceptions')
})








// create server

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})