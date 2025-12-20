const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Email must contain @' });
        }

        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (!hasLetter || !hasNumber) {
            return res.status(400).json({ message: 'Password must be alphanumeric (contain both letters and numbers)' });
        }

        // Check availability
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // Create Token
        const token = jwt.sign(
            { id: savedUser._id, isAdmin: savedUser.isAdmin },
            process.env.JWT_SECRET || 'secret_key_123',
            { expiresIn: '1h' }
        );

        res.status(201).json({
            token,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                isAdmin: savedUser.isAdmin
            }
        });

    } catch (err) {
        console.error(err);
        if (err.code === 'EAUTH' || err.message.includes('Invalid login')) {
            return res.status(500).json({ message: 'User created, but email failed: Check Server SMTP Credentials' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // Check user
        // Strictly check by email only as per new requirement
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create Token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'secret_key_123',
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});




module.exports = router;
