require("dotenv").config();

const express = require("express");
const axios = require("axios");
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
    })
    .post("/logout", (req, res) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    })
    .get("/all-restaurants", (req, res) => {
        axios
            .get(`${process.env.API_BASE_URL}/api/restaurant`)
            .then((response) => {
                if (response.data.status) {
                    const restaurants = response.data.data;
                    res.render("all-restaurants", { restaurants: restaurants });
                } else {
                    console.error("API returned a failure status");
                }
            })
            .catch((error) => {
                console.error("Error fetching restaurants:", error);
            });
    })
    .get("/all-dishes", (req, res) => {
        axios
            .get(`${process.env.API_BASE_URL}/api/dish`)
            .then((response) => {
                if (response.data.status) {
                    const dishes = response.data.data;
                    // console.log("Dishes:", dishes);
                    res.render("all-dishes", { dishes: dishes });
                } else {
                    console.error("API returned a failure status");
                }
            })
            .catch((error) => {
                console.error("Error fetching dishes:", error);
            });
    });
module.exports = viewRouter;
