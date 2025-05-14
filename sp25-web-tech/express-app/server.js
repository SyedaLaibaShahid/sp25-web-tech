// start your server by node server.js
// or
// nodemon server
//if nodemon is not installed install it by running command> npm i nodemon -g

let express = require("express");
let expressLayouts = require("express-ejs-layouts");
let server = express();

server.use(express.static("public"));
server.use(expressLayouts);
server.set("view engine", "ejs");


server.get("/cv", (req, res) => {
    res.render("cv", {layout:false});
});
server.get("/checkout", (req, res) => {
    res.render("checkout", {layout:false});
});
server.get("/landingPage", (req, res) => {
    //   res.send("Hello AI Classs");
    res.render("landingPage");
});



server.listen(4000, () => {
    console.log("Server Started at localhost:4000");
});
