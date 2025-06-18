const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const OrderController = require("../controllers/OrderController");
const { isLoggedIn, isAuth } = require("../middleware/auth");

// Login Routes
router.get("/login", UserController.getLogin);
router.post("/login", UserController.postLogin);

// Register Routes
router.get("/register", UserController.getRegister);
router.post("/register", UserController.postRegister);

// Order Listing
router.get("/my-orders", isLoggedIn, OrderController.listOrders);

// Logout
router.get("/logout", isLoggedIn, UserController.logout);

// Complaints
router.get("/contact", UserController.getContactForm);
router.post("/contact", isLoggedIn, UserController.postComplaint);
router.get("/my-complains", isLoggedIn, UserController.userComplaints);

module.exports = router;
