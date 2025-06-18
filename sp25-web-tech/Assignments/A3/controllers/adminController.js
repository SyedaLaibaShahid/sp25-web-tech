const Admin = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");

// Admin login page
exports.getLogin = (req, res) => {
  res.render("admin/login", { layout: "admin/layout"});
};

// Login POST
exports.login = async (req, res) => {
  const { email, password } = req.body;
          const admin = await Admin.findOne({ email });
          if (admin && (bcrypt.compare(password, admin.password) && admin.isAdmin)) {
              req.session.user = {
                  id: admin._id, 
                  name: admin.name,
                  isAdmin: admin.isAdmin,
              };
              res.redirect("/admin");
          } else {
              res.send("Invalid credentials");
          }
};

// Logout
exports.logout = (req, res) => {
  req.session.user = null;
  res.redirect("/");
};

// Dashboard
exports.dashboard = async (req, res) => {
    const products = await Product.find();
    res.render("admin/dashboard", { products, layout: "admin/layout" });
};

// Product management

exports.getAddProduct = (req, res) => {
  res.render("admin/addProduct", { layout: "admin/layout" });
};

exports.addProduct = async (req, res) => {
  try {
    const { name, brand, rating, price, category, stock } = req.body;
    const image = req.file ? req.file.filename : "";

    const product = new Product({
      name,
      brand,
      rating,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      image,
    });

    await product.save();
    res.redirect("/admin");  
  } catch (err) {
    console.error("Failed to add product:", err);
    res.status(500).send("Error saving product");
  }
};

exports.getEditProduct = async (req, res) => {
    try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");

    res.render("admin/editProduct", { product, layout:"admin/layout" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, type, category, price, stock } = req.body;

    const updateData = {
      name,
      description,
      type,
      category,
      price: parseFloat(price),
      stock: parseInt(stock)
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/admin");
  } catch (err) {
    console.log("Failed to update product:", err);
    res.status(500).send("Error updating product");
  }
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
};


// View all orders
exports.viewOrders = async (req, res) => {
  const orders = await Order.find({});
  res.render("admin/viewOrders", { orders, layout: "admin/layout"});
};