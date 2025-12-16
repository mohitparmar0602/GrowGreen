const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const verifyAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seed-marketplace');
        console.log('Connected to MongoDB');

        const admin = await User.findOne({ username: 'admin' });
        if (!admin) {
            console.log('Admin user NOT FOUND');
        } else {
            console.log('Admin user FOUND:', admin.email);
            const isMatch = await bcrypt.compare('admin@123', admin.password);
            console.log('Password match check for "admin@123":', isMatch);
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyAdmin();
