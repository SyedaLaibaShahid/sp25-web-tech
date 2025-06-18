const Product = require("../models/Product");

exports.getLandingPage = async (req, res) => {
    try {
        // Get top-rated products
        const topRated = await Product.find({ rating: 5 }).limit(8);

        // Get latest 8 products as "New Arrivals"
        const newArrivals = await Product.find()
            .sort({ createdAt: -1 })
            .limit(8);

        res.render("landingPage", {
            layout: "layout",
            topRated,
            newArrivals,
        });
    } catch (err) {
        console.error("Error loading landing page:", err);
        res.status(500).send("Server Error");
    }
};
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render("viewProduct", { product, layout: "layout" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// Add to Cart
exports.addToCart = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        if (!req.session.cart) {
            req.session.cart = [];
        }

        const existingProduct = req.session.cart.find(
            (item) => item._id === productId
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            req.session.cart.push({
                _id: product._id,
                name: product.name,
                price: product.price,
                quantity: 1,
            });
        }

        res.redirect("/cart");
    } catch (error) {
        res.status(500).send("Server error");
    }
};

// View Cart
exports.viewCart = (req, res) => {
    const cart = req.session.cart || [];
    res.render("cart", { cart });
};

exports.viewCheckout = (req, res) => {
    res.render("checkout");
};
