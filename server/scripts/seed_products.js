const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: '../.env' }); // Adjust path if needed, assuming run from server/scripts

const seedsData = [
    { name: "Hybrid Tomato Seeds", description: "High-yield hybrid tomato seeds, disease resistant.", image: "/tomato_seeds.png" },
    { name: "Basmati Rice Seeds", description: "Premium aromatic Basmati rice seeds for export quality yield.", image: "/basmati_rice_seeds.png" },
    { name: "Organic Wheat Seeds", description: "Certified organic wheat seeds, suitable for all climate zones.", image: "/wheat_seeds.png" },
    { name: "Cotton Seeds BT", description: "Genetically modified cotton seeds for pest resistance.", image: "/cotton_seeds.png" },
    { name: "Sunflower Seeds", description: "High oil content sunflower seeds for commercial farming.", image: "/sunflower_seeds.png" },
    { name: "Mustard Seeds", description: "Bold size mustard seeds, high germination rate.", image: "/mustard_seeds.png" },
    { name: "Coriander Seeds", description: "Aromatic coriander seeds, great for both leaf and seed harvest.", image: "/coriander_seeds.png" },
    { name: "Pumpkin Seeds", description: "Large pumpkin seeds, vigorous growth habit.", image: "/pumpkin_seeds.png" },
    { name: "Chilli Seeds", description: "Hot variety chilli seeds, rapid maturing.", image: "/chilli_seeds.png" },
    { name: "Carrot Seeds", description: "Red long carrot seeds, sweet and crunchy.", image: "/carrot_seeds.png" },
    { name: "Corn/Maize Seeds", description: "Sweet corn hybrid seeds, sugary and tender.", image: "/corn_seeds.png" },
    { name: "Soybean Seeds", description: "High protein soybean seeds, nitrogen fixing.", image: "/soybean_seeds.png" },
    { name: "Red Onion Seeds", description: "Long storage red onion seeds, pungent flavor.", image: "/onion_seeds.png" },
    { name: "Watermelon Seeds", description: "Sugar baby watermelon seeds, sweet and juicy.", image: "/watermelon_seeds.png" },
    { name: "Cucumber Seeds", description: "Crisp green cucumber seeds, heat tolerant.", image: "/cucumber_seeds.png" },
    { name: "Spinach Seeds", description: "Fast growing spinach seeds, rich in iron.", image: "/spinach_seeds.png" },
    { name: "Green Peas", description: "Garden sweet peas, high pods per plant.", image: "/green_peas_seeds.png" },
    { name: "Okra (Lady Finger)", description: "Dark green tender okra seeds, disease resistant.", image: "/okra_seeds.png" },
    { name: "Brinjal (Eggplant)", description: "Purple round brinjal seeds, high yielding.", image: "/brinjal_seeds.png" },
    { name: "White Radish", description: "Long white radish seeds, crisp and mild pungency.", image: "/white_radish_uploaded.jpg" },
];

const fertilizersData = [
    { name: "Urea Fertilizer", description: "High nitrogen content (46%) for vigorous vegetative growth.", image: "/urea_fertilizer_final.jpg" },
    { name: "DAP (Di-ammonium Phosphate)", description: "Excellent source of P and N for root development.", image: "/dap_fertilizer_final.jpg" },
    { name: "MOP (Muriate of Potash)", description: "Essential potassium fertilizer for crop quality and disease resistance.", image: "/mop_fertilizer_uploaded.jpg" },
    { name: "NPK 19-19-19", description: "Balanced water-soluble fertilizer for all growth stages.", image: "/npk_19_19_19_uploaded.jpg" },
    { name: "Single Super Phosphate (SSP)", description: "Contains phosphorus, calcium and sulphur for soil health.", image: "/ssp_fertilizer_uploaded.jpg" },
    { name: "Zinc Sulphate 33%", description: "Corrects zinc deficiency, crucial for enzyme function.", image: "/zinc_sulphate_uploaded.jpg" },
    { name: "Boron 20%", description: "Enhances flowering and fruit setting in crops.", image: "/boron_fertilizer_uploaded.jpg" },
    { name: "Magnesium Sulphate", description: "Essential for chlorophyll production and photosynthesis.", image: "/magnesium_sulphate_uploaded.jpg" },
    { name: "Ammonium Sulphate", description: "Good source of nitrogen and sulphur for alkaline soils.", image: "/ammonium_sulphate_uploaded.jpg" },
    { name: "Calcium Nitrate", description: "Provides calcium and nitrogen for strong cell walls.", image: "/calcium_nitrate_uploaded.jpg" },
    { name: "Ferrous Sulphate", description: "Iron fertilizer to prevent chlorosis (yellowing).", image: "/ferrous_sulphate_uploaded.jpg" },
    { name: "Copper Sulphate", description: "Corrects copper deficiency and acts as fungicide.", image: "/copper_sulphate_uploaded.jpg" },
    { name: "NPK 12-61-00 (MAP)", description: "High phosphorus starter fertilizer for root establishment.", image: "/npk_12_61_00_uploaded.jpg" },
    { name: "Potassium Sulphate (SOP)", description: "Chloride-free potassium for sensitive crops like tobacco.", image: "/potassium_sulphate_uploaded.jpg" },
    { name: "Neem Cake", description: "Organic fertilizer and pest repellent.", image: "/neem_cake_uploaded.jpg" },
    { name: "Vermicompost", description: "Nutrient-rich organic compost for soil conditioning.", image: "/vermicompost_uploaded.jpg" },
    { name: "Seaweed Extract", description: "Growth promoter derived from kelp.", image: "/seaweed_extract_uploaded.jpg" },
    { name: "Humic Acid", description: "Improves nutrient uptake and soil structure.", image: "/humic_acid_uploaded.jpg" },
    { name: "Manganese Sulphate", description: "Essential micronutrient for enzyme activation.", image: "/manganese_sulphate_uploaded.jpg" },
    { name: "Sulphur 90% WDG", description: "Essential secondary nutrient and fungicide.", image: "/sulphur_90_wdg_uploaded.jpg" },
];

const seedProducts = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrimarket'; // Fallback
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected for Seeding');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Existing products cleared');

        const products = [];

        // Add Seeds
        seedsData.forEach((item, index) => {
            products.push({
                ...item,
                category: 'Seeds',
                price: Math.floor(Math.random() * 500) + 100,
                unit: 'pkt',
                supplier: `Supplier ${String.fromCharCode(65 + (index % 5))}`,
                stock: 100
            });
        });

        // Add Fertilizers
        fertilizersData.forEach((item, index) => {
            products.push({
                ...item,
                category: 'Fertilizers',
                price: Math.floor(Math.random() * 1000) + 200,
                unit: 'kg',
                supplier: `Supplier ${String.fromCharCode(88 - (index % 5))}`,
                stock: 100
            });
        });

        await Product.insertMany(products);
        console.log(`Seeded ${products.length} products successfully`);

        mongoose.connection.close();
        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
