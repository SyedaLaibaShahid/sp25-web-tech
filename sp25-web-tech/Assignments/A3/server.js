const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const open = require("open").default; // ✅ fix

const server = express();

server.use(express.static("public"));
server.use(expressLayouts);
server.set("view engine", "ejs");

server.get("/cv", (req, res) => {
    res.render("cv", { layout: false });
});
server.get("/checkout", (req, res) => {
    res.render("checkout", { layout: false });
});
server.get("/landingPage", (req, res) => {
    res.render("landingPage");
});
server.get("/login", (req, res) => {
    res.render("login", { layout: false });
});
server.get("/register", (req, res) => {
    res.render("register", { layout: false });
});

server.listen(4000, () => {
    console.log("Server Started at http://localhost:4000");
    open("http://localhost:4000/landingPage"); //  opens browser
});
