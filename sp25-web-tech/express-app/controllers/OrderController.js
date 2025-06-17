const mongoose = require("mongoose");
const Order = require("../models/Order"); // adjust path as needed

exports.listOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.render("orders", { orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error });
    }
};

exports.placeOrder = async (req, res) => {
    try {
        const cart = req.session.cart || [];

        if (cart.length === 0) {
            return res.redirect('/cart');
        }

        const orderItems = cart.map(item => ({
            product: item._id,
            quantity: item.quantity,
            price: item.price,
        }));

        const order = new Order({
            user: req.session.user ? req.session.user.name : null,
            items: orderItems,
        });

        await order.save();

        // Clear the cart
        req.session.cart = [];

        res.redirect('/');
    } catch (error) {
        console.error('Order Placement Error:', error);
        res.status(500).send('Something went wrong while placing your order.');
    }
};
