const express = require('express')
const mongoose = require('mongoose')
const User = require('../model/user')
const router = express.Router()
const {pupload} = require('../multer')
const Product = require('../model/product')


const validateProductData = (data)=>{
    const errors = [];
    if(!data.name) errors.push('Product name is required')
    if(!data.description) errors.push('Product Description is required')  
    if(!data.price || data.price<=0 || isNaN(data.price)) errors.push('Give the right price')
    if(!data.stock || data.stock<=0 || isNaN(data.stock)) errors.push('Proper stock is required')  
    if(!data.category) errors.push('Product category is required')
    if(!data.email) errors.push('Email is required')
        
        
    return errors;
}


router.post('/create-product', pupload.array('images',10),async(req,res)=>{
    console.log('Hello');
    const{name,description,category,tags,price,email,stock} = req.body;
    const images = req.files.map((file)=> file.path);

    const validationErrors = validateProductData({name,description,category,tags,price,email,stock});
    if(validationErrors.length>0){
        return res.status(400).json({errors:validationErrors})
    }
    if(images.length===0){
        return res.status(400).json({error:'At least one image is needed'})
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Email doesn't exist in database."})
        }
        const newProduct = new Product({
            name,
            description,
            category,
            tags,
            price,
            email,
            stock,
            images,
        });

        await newProduct.save()

        res.status(201).json({
            message:'Product is created!',
            product:newProduct,
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            error:'Sever does not respond'
        })
    }
})

module.exports=router;