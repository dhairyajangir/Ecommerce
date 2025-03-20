const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity cannot be less than 1'],
                },
                price: {
                    type: Number,
                    required: true,
                    min: [0, 'Price cannot be negative'],
                },
                image: {
                    type: String,
                    required: true,
                },
            },
        ],
        shippingAddress: {
            country: { type: String, required: true },
            city: { type: String, required: true },
            address1: { type: String, required: true },
            address2: { type: String },
            zipCode: { type: Number, required: true },
            addressType: { type: String, required: true },
        },
        totalAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        orderStatus: {
            type: String,
            enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Processing',
        },
        deliveredAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);