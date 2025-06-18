require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const expressLayouts = require("express-ejs-layouts");
const { isLoggedIn } = require("./middleware/auth");

// Models
const User = require("./models/User");
const Product = require("./models/Product");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(expressLayouts);
app.set("view engine", "ejs");

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(" MongoDB Connected");
    })
    .catch((err) => {
        console.error(" MongoDB Connection Error:", err);
    });

// Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
);

// Global user session access
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Routes
const productController = require("./controllers/ProductController");
const orderController = require("./controllers/OrderController");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/", userRoutes);
app.get("/", productController.getLandingPage);
app.get("/products/:id", productController.getProductById);
app.get("/cart", isLoggedIn, productController.viewCart);
app.get("/cart/add/:id", isLoggedIn, productController.addToCart);
app.post("/checkout", isLoggedIn, productController.viewCheckout);
app.post("/product/placeorder", isLoggedIn, orderController.placeOrder);

app.use("/admin", adminRoutes);

app.get("/about", (req, res) => {
    res.render("about", { layout: "layout" });
});

app.get("/cv", (req, res) => {
    res.render("cv", { layout: false });
});

app.get("/checkout", isLoggedIn, (req, res) => {
    res.render("checkout", { layout: false });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(" Server Started at http://localhost:4000");
    const { exec } = require("child_process");
    exec("start http://localhost:4000");
});

// mongod --dbpath "E:\Softwares\MongoDB\data\db"

