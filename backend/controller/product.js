const express = require('express')
const mongoose = require('mongoose')
const User = require('../model/user')
const router = express.Router()
const {pupload} = require('../multer')


const validateProductData = (data)=>{
    const errors = [];
    if(!data.name) errors.push('Product name is required')
    if(!data.description) errors.push('Product Description is required')  
    if(!data.price || price<=0 || isNaN(price)) errors.push('Give the right price')
    if(!data.stock || stock<=0 || isNaN(stock)) errors.push('Proper stock is required')  
    if(!data.category) errors.push('Product category is required')
    if(!data.email) errors.push('Email is required')
        
        
    return errors;
}


router.post('/create-product', pupload.array('images',10),async(req,res)=>{
    console.log('Hello');
    const{name,description,category,tags,price,email,stock} = req.body;
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
            return res.status(400).json({error:"email doesn't exist"})
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
            message:'product is created!',
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