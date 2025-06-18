const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            
        },
        items: [
            {
                product: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
