const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const OrderController = require("../controllers/OrderController");
const { isLoggedIn } = require("../middleware/auth");

// Login Routes
router.get("/login", UserController.getLogin);
router.post("/login", UserController.postLogin);

// Register Routes
router.get("/register", UserController.getRegister);
router.post("/register", UserController.postRegister);



router.get("/my-orders", isLoggedIn, OrderController.listOrders);

// Logout Route
router.get("/logout", isLoggedIn, UserController.logout);

module.exports = router;
