const express = require("express");
const viewRouter = express.Router();

viewRouter
    .get("/", (req, res) => {
        res.render("index.ejs");
    })
    .get("/login", (req, res) => {
        res.render("login.ejs");
    })
    .get("/signup", (req, res) => {
        res.render("signup.ejs");
    })
    .get("/create-restaurant", (req, res) => {
        res.render("create-restaurant.ejs");
    })
    .get("/edit-restaurant", (req, res) => {
        res.render("edit-restaurant.ejs");
    })
    .get("/create-menu", (req, res) => {
        const rid = req.query.rest_id;
        res.render("create-menu.ejs", { restId: rid });
    })
    .get("/create-dish", (req, res) => {
        const rid = req.query.rest_id;
        const mid = req.query.menu_id;
        res.render("create-dish.ejs", { restId: rid, menuId: mid });
    })
    .get("/failure", (req, res) => {
        res.render("failure.ejs");
    });
module.exports = viewRouter;
