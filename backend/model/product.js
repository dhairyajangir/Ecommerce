const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    price:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        match:[/.+@.+\..+/,"need valid email"]
    },
    stock:{
        type:Number,
        required:true
    },
    images:{
        type:[String],
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true
}
);


module.exports=mongoose.model("Product", productSchema);
