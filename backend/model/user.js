const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { PassThrough } = require('nodemailer/lib/xoauth2');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,"Please enter your email"],

    },

    email:{
        type:String,
        required : [true,"Please enter your email"],
    },

    password:{
        type:String,
        required : [true,"Please enter your password"],
        minLength:[4,"Password should be greater than 4 letters"]
    },

    phoneNumber:{
        type:Number,
        maxLength:[10,"Dont exceed 10 numbers"]


    },
    address:[{

        country:{
            type:String,
        },
        city:{
            type:String,
        },
        address1:{
            type:String
        },
        address2:{
            type:String
        },
        zipCode:{
            type:Number,
        },
        addressType:{
            type:String,
        },
    }
    ],
    role:{
        type:String,
        default:"user"
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },


    },

    createdAt:{
        type:Date,
        default:Date.now,
    },

    resetPasswordToken:String,
    resetPasseordTime:Date,
});



//Hash password

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})



// jsonwebtoken



userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this_id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    })
}


//compare password


userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)




}




module.exports=mongoose.model('User',userSchema)