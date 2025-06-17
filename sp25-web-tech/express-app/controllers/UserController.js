const bcrypt = require("bcrypt");
const User = require("../models/User");

const UserController = {
    getLogin(req, res) {
        res.render("login", { layout: false });
    },

    async postLogin(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
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
};

module.exports = UserController;
