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
        return next(new ErrorHandler("Invaild Email",401))
    }
    const isPasswordMatched = await bcrypt.compare(password,user.password)
    console.log("At auth","Password:",password,"Hash:",user.password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invaild Password",401))
    }
    user.password = undefined;
    res.status(200).json({
        success: true,
        user
    })

}));

router.get("/profile", catchAsyncErrors(async (req, res, next) => {
    const { email } = req.query;
    if (!email) {
        return next(new ErrorHandler("Please provide an email", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        user: {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            avatarUrl: user.avatar.url
        },
        addresses: user.addresses,
    });
}));


router.post("/add-address", catchAsyncErrors(async (req, res, next) => {
    const { country, city, address1, address2, zipCode, addressType, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const newAddress = {
        country,
        city,
        address1,
        address2,
        zipCode,
        addressType,
    };

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({
        success: true,
        addresses: user.addresses,
    });
}));


router.get("/addresses", catchAsyncErrors(async (req, res, next) => {
    const { email } = req.query;
    if (!email) {
        return next(new ErrorHandler("Please provide an email", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        addresses: user.addresses,
    });
}
));


module.exports = router;