const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    rating: Number,
    price: String,
    category: String,
    Stock: Number,
    image: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);