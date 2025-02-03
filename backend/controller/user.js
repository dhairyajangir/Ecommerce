const express = require("express");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt"); 
const User = require("../model/User");
const jwt=require('jsonwebtoken')
const sendMail=require('../utils/sendMail')
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); // Import catchAsyncErrors

// create user
router.post(
    "/create-user",
    upload.single("file"),
    catchAsyncErrors(async (req, res, next) => {
        console.log("Creating user...");
        const { name, email, password } = req.body;

        const userEmail = await User.findOne({ email });
        if (userEmail) {
            if (req.file) {
                const filepath = 
                path.join(__dirname, "../uploads", 
                    req.file.filename);
                try {
                    fs.unlinkSync(filepath);
                } catch (err) {
                    console.log("Error removing file:", err);
                    return res.status(500).json({ message: "Error removing file" });
                }
            }
            return next(new ErrorHandler("User already exists", 400));
        }

        let fileUrl = "";
        if (req.file) {
            fileUrl = path.join("uploads", req.file.filename);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("At Create ", "Password: ", password, "Hash: ", hashedPassword);
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: req.file?.filename || "",
                url: fileUrl,
            },
        });
        console.log(user);
        res.status(201).json({ success: true, user });
    })
);

router.post('/login',catchAsyncErrors(async(req,res,next)=>{
    console.log('Creating User...')
    const {email,password}=req.body
    if(!email || !password){
        return next(new ErrorHandler("please provide credentials!",400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invaild Email or Password",401))
    }
    const isPasswordMatched = await bcrypt.compare(password,user.password)
    console.log("At auth","Password:",password,"Hash:",user.password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invaild Email or Password",401))
    }
    user.password = undefined;
    res.status(200).json({
        success: true,
        user
    })

}))

module.exports = router;