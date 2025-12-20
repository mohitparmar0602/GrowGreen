const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { customerName, customerEmail, products, totalAmount, shippingAddress } = req.body;

        const newOrder = new Order({
            customerName,
            customerEmail,
            products,
            totalAmount,
            shippingAddress
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get orders by user email
router.get('/user/:email', async (req, res) => {
    try {
        const orders = await Order.find({ customerEmail: req.params.email }).sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all orders (for Admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
