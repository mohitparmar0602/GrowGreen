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

// Generate 12 Seeds
const seedNames = ['Golden Wheat', 'Royal Rice', 'Hybrid Tomato', 'Sweet Corn', 'Mustard', 'Sunflower', 'Cotton', 'Pumpkin', 'Watermelon', 'Carrot', 'Radish', 'Spinach'];

for (let i = 0; i < 12; i++) {
    const seedImages = {
        'Golden Wheat': '/golden_wheat_seeds.jpg',
        'Royal Rice': '/royal_rice_seeds.jpg',
        'Hybrid Tomato': '/hybrid_tomato_seeds.jpg',
        'Sweet Corn': '/sweet_corn_seeds.jpg',
        'Mustard': '/mustard_seeds.jpg',
        'Sunflower': '/sunflower_seeds.jpg',
        'Cotton': '/cotton_seeds.jpg',
        'Pumpkin': '/pumpkin_seeds.jpg',
        'Watermelon': '/watermelon_seeds.jpg',
        'Carrot': '/carrot_seeds.jpg',
        'Radish': '/radish_seeds.jpg',
        'Spinach': '/spinach_seeds.jpg'
    };
    const seedName = seedNames[i % seedNames.length];

    products.push({
        name: `${i + 1}. ${seedName} Seeds`,
        category: 'Seeds',
        price: Math.floor(Math.random() * 1000) + 100,
        unit: 'kg',
        image: seedImages[seedName] || '/seeds_collection.jpg',
        description: `High-quality ${seedName} seeds for optimal yield.`,
        supplier: i % 2 === 0 ? 'Green Earth Farms' : 'Sunny Fields',
        stock: Math.floor(Math.random() * 500) + 50
    });
}

// Generate 12 Fertilizers
const fertNames = ['NPK 19-19-19', 'Urea', 'DAP', 'Potash', 'Organic Compost', 'Bone Meal', 'Fish Emulsion', 'Seaweed Extract', 'Cow Manure', 'Vermicompost', 'Zinc Sulphate', 'Magnesium Sulphate', 'Calcium Nitrate', 'Boron', 'Iron Chelate', 'Sulfur', 'Bio-Fertilizer', 'Growth Booster', 'Root Developer', 'Flower Enhancer'];

for (let i = 0; i < 12; i++) {
    const fertImages = {
        'NPK 19-19-19': '/npk_19_19_19_mix.jpg',
        'Urea': '/urea_mix.jpg',
        'DAP': '/dap_mix.jpg',
        'Potash': '/potash_mix.jpg',
        'Organic Compost': '/organic_compost_mix.jpg',
        'Bone Meal': '/bone_meal_mix.jpg',
        'Fish Emulsion': '/fish_emulsion_mix.jpg',
        'Seaweed Extract': '/seaweed_extract_mix.jpg',
        'Cow Manure': '/cow_manure_mix.jpg',
        'Vermicompost': '/vermicompost_mix.jpg',
        'Zinc Sulphate': '/zinc_sulphate_mix.jpg',
        'Magnesium Sulphate': '/magnesium_sulphate_mix.jpg'
    };
    const fertName = fertNames[i % fertNames.length];

    products.push({
        name: `${i + 1}. ${fertName} Mix`,
        category: 'Fertilizers',
        price: Math.floor(Math.random() * 2000) + 200,
        unit: 'bag',
        image: fertImages[fertName] || 'https://placehold.co/400x300?text=No+Image',
        description: `Premium quality ${fertName} for healthy plant growth.`,
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
