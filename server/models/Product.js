const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['Desc', 'Seeds', 'Fertilizers', 'Pesticides', 'Tools'] },
    price: { type: Number, required: true },
    unit: { type: String, required: true }, // e.g., 'kg', 'bag', 'pkt'
    supplier: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 100 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
