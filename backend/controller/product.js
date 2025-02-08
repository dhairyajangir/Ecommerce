const express = require('express');
const mongoose = require('mongoose');
const Product = require('../model/product');
const User = require('../model/User');
const router = express.Router();
const { pupload } = require("../multer");
const path = require('path');  //add this line

const validateProductData = (data) => {
    const errors = [];

    if (!data.name) errors.push('Product name is required');
    if (!data.description) errors.push('Product description is required');
    if (!data.category) errors.push('Product category is required');
    if (!data.price || isNaN(data.price) || data.price <= 0) errors.push('Valid product price is required');
    if (!data.stock || isNaN(data.stock) || data.stock < 0) errors.push('Valid product stock is required');
    if (!data.email) errors.push('Email is required');

    return errors;
};

router.post('/create-product', pupload.array('images', 10), async (req, res) => {
    console.log("HEllos")
    const { name, description, category, tags, price, stock, email } = req.body;
        // Map uploaded files to accessible URLs
        const images = req.files.map((file) => {
            return `/products/${path.basename(file.path)}`;
        });

    const validationErrors = validateProductData({ name, description, category, price, stock, email });
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    if (images.length === 0) {
        return res.status(400).json({ error: 'At least one image is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Email does not exist in the users database' });
        }

        const newProduct = new Product({
            name,
            description,
            category,
            tags,
            price,
            stock,
            email,
            images,
        });

        await newProduct.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error. Could not create product.' });
    }
});

// Route: Get all products
router.get('/get-products', async (req, res) => {
    try {
        const products = await Product.find();
        const productsWithFullImageUrl = products.map(product => {
            if (product.images && product.images.length > 0) {
                product.images = product.images.map(imagePath => {
                    // Image URLs are already prefixed with /products
                    return imagePath;
                });
            }
            return product;
        });
        res.status(200).json({ products: productsWithFullImageUrl });
    } catch (err) {
        console.error(' Server error:', err);
        res.status(500).json({ error: 'Server error. Could not fetch products.' });
    }
});


router.get('/my-products', async (req, res) => {
    const { email } = req.query;
    try {
        const products = await Product.find({ email });
        const productsWithFullImageUrl = products.map(product => {
            if (product.images && product.images.length > 0) {
                product.images = product.images.map(imagePath => {
                    return imagePath;
                });
            }
            return product;
        });
        res.status(200).json({ products: productsWithFullImageUrl });
    } catch (err) {
        console.error(' Server error:', err);
        res.status(500).json({ error: 'Server error. Could not fetch products.' });
    }
}
);

router.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).json({ product });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error. Could not fetch product.' });
    }
});

router.put('/update-product/:id', pupload.array('images', 10), async (req, res) => {
    const { id } = req.params;
    const { name, description, category, tags, price, stock, email } = req.body;

    try {
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        let updatedImages = existingProduct.images;
        if (req.files && req.files.length > 0) {
            updatedImages = req.files.map((file) => {
                return `/products/${path.basename(file.path)}`;
            });
        }

        const validationErrors = validateProductData({
            name,
            description,
            category,
            price,
            stock,
            email,
        });

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        existingProduct.name = name;
        existingProduct.description = description;
        existingProduct.category = category;
        existingProduct.tags = tags;
        existingProduct.price = price;
        existingProduct.stock = stock;
        existingProduct.email = email;
        existingProduct.images = updatedImages;

        await existingProduct.save();

        res.status(200).json({
            message: '✅ Product updated successfully',
            product: existingProduct,
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error. Could not update product.' });
    }
});

router.delete('/delete-product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        await product.deleteOne();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error. Could not delete product.' });
    }
}
);

module.exports = router;