const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/seed-marketplace')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

const products = [
    {
        name: 'Organic Wheat Seeds',
        category: 'Seeds',
        price: 1200,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1501430654243-c934cec2e1c0?w=800&auto=format&fit=crop&q=60',
        description: 'High-yield organic wheat seeds suitable for all climates.',
        supplier: 'Green Earth Farms',
        stock: 500
    },
    {
        name: 'Premium NPK Fertilizer',
        category: 'Fertilizers',
        price: 850,
        unit: 'bag',
        image: '/products/npk_fertilizer.png',
        description: 'Balanced Nitrogen, Phosphorus, and Potassium fertilizer.',
        supplier: 'AgroChem Industries',
        stock: 200
    },
    {
        name: 'Hybrid Tomato Seeds',
        category: 'Seeds',
        price: 450,
        unit: 'pkt',
        image: '/products/tomato_seeds.png',
        description: 'Disease-resistant tomato seeds for robust harvest.',
        supplier: 'Veggie Grow',
        stock: 1000
    },
    {
        name: 'Organic Compost',
        category: 'Fertilizers',
        price: 300,
        unit: 'bag',
        image: '/products/organic_compost.png',
        description: 'Rich organic compost to improve soil health.',
        supplier: 'Nature Best',
        stock: 300
    },
    {
        name: 'Sunflower Seeds',
        category: 'Seeds',
        price: 600,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=60',
        description: 'High-quality sunflower seeds for oil extraction.',
        supplier: 'Sunny Fields',
        stock: 400
    },
    {
        name: 'Urea Fertilizer',
        category: 'Fertilizers',
        price: 500,
        unit: 'bag',
        image: '/products/urea_fertilizer.png',
        description: 'High nitrogen urea fertilizer for leafy growth.',
        supplier: 'AgriCorp',
        stock: 600
    },
    {
        name: 'Pesticide Sprayer',
        category: 'Tools',
        price: 1500,
        unit: 'piece',
        image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=60',
        description: 'Manual knapsack sprayer for pesticides.',
        supplier: 'FarmTools Inc.',
        stock: 150
    },
    {
        name: 'Corn Seeds',
        category: 'Seeds',
        price: 250,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=60',
        description: 'Sweet corn seeds for commercial farming.',
        supplier: 'CornPlus',
        stock: 800
    }
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);

        // Seed Admin User
        await User.deleteMany();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin@123', salt);

        await User.create({
            username: 'admin',
            email: 'admin@agrimarket.com',
            password: hashedPassword,
            isAdmin: true
        });
        console.log('Admin User Created: admin / admin@123');
        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();
