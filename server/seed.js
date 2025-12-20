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

const products = [];

// Generate 20 Seeds
const seedNames = ['Golden Wheat', 'Royal Rice', 'Hybrid Tomato', 'Sweet Corn', 'Mustard', 'Sunflower', 'Cotton', 'Soybean', 'Barley', 'Oats', 'Millet', 'Sorghum', 'Pumpkin', 'Watermelon', 'Cucumber', 'Carrot', 'Radish', 'Spinach', 'Peas', 'Beans'];

for (let i = 0; i < 20; i++) {
    products.push({
        name: `${i + 1}. ${seedNames[i % seedNames.length]} Seeds`,
        category: 'Seeds',
        price: Math.floor(Math.random() * 1000) + 100,
        unit: 'kg',
        image: 'https://placehold.co/400x300?text=No+Image', // Placeholder
        description: `High-quality ${seedNames[i % seedNames.length]} seeds for optimal yield.`,
        supplier: i % 2 === 0 ? 'Green Earth Farms' : 'Sunny Fields',
        stock: Math.floor(Math.random() * 500) + 50
    });
}

// Generate 20 Fertilizers
const fertNames = ['NPK 19-19-19', 'Urea', 'DAP', 'Potash', 'Organic Compost', 'Bone Meal', 'Fish Emulsion', 'Seaweed Extract', 'Cow Manure', 'Vermicompost', 'Zinc Sulphate', 'Magnesium Sulphate', 'Calcium Nitrate', 'Boron', 'Iron Chelate', 'Sulfur', 'Bio-Fertilizer', 'Growth Booster', 'Root Developer', 'Flower Enhancer'];

for (let i = 0; i < 20; i++) {
    products.push({
        name: `${i + 1}. ${fertNames[i % fertNames.length]} Mix`,
        category: 'Fertilizers',
        price: Math.floor(Math.random() * 2000) + 200,
        unit: 'bag',
        image: 'https://placehold.co/400x300?text=No+Image', // Placeholder
        description: `Premium quality ${fertNames[i % fertNames.length]} for healthy plant growth.`,
        supplier: i % 2 === 0 ? 'AgroChem Industries' : 'Nature Best',
        stock: Math.floor(Math.random() * 300) + 20
    });
}

// Tools (keep a few)
products.push({
    name: 'Pesticide Sprayer',
    category: 'Tools',
    price: 1500,
    unit: 'piece',
    image: 'https://placehold.co/400x300?text=No+Image',
    description: 'Manual knapsack sprayer for pesticides.',
    supplier: 'FarmTools Inc.',
    stock: 150
});

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
