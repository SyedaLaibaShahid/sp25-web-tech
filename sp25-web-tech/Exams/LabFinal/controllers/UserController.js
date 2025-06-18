const bcrypt = require("bcrypt");
const User = require("../models/User");
const Complaint = require("../models/complaint");

const UserController = {
  getLogin(req, res) {
    res.render("login", { layout: false });
  },

  async postLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      !user.isAdmin
    ) {
      req.session.user = {
        id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
      };
      res.redirect("/");
    } else {
      res.send("Invalid credentials");
    }
  },

  getRegister(req, res) {
    res.render("register", { layout: false });
  },

  async postRegister(req, res) {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashed }).save();
    res.redirect("/login");
  },

  logout(req, res) {
    req.session.destroy(() => res.redirect("/"));
  },

  getContactForm(req, res) {
    res.render("contact", { user: req.session.user });
  },

  async postComplaint(req, res) {
    try {
      const { orderId, message } = req.body;
      await Complaint.create({
        user: req.session.user._id,
        orderId,
        message,
      });
      res.redirect("/my-complaints");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error submitting complaint.");
    }
  },

  async userComplaints(req, res) {
    try {
      const complaints = await Complaint.find({
        user: req.session.user._id,
      }).sort({ createdAt: -1 });
      res.render("myComplaints", { complaints });
    } catch (err) {
      res.status(500).send("Error fetching your complaints.");
    }
  }
};

module.exports = UserController;
