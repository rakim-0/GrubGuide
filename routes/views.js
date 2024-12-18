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
    .get("/view-cart", (req, res) => {
        res.render("view-cart.ejs");
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
        const { latitude, longitude } = req.query;
        let apiUrl = `${process.env.API_BASE_URL}/api/restaurant`;
        if (latitude && longitude) {
            apiUrl = `${process.env.API_BASE_URL}/api/restaurant/nearby?latitude=${latitude}&longitude=${longitude}`;
        }
        axios
            .get(apiUrl)
            .then((response) => {
                if (response.data.status) {
                    const restaurants = response.data.data;
                    res.render("all-restaurants", {
                        restaurants: restaurants,
                        latitude: latitude,
                        longitude: longitude,
                    });
                } else {
                    console.error("API returned a failure status");
                    res.status(500).render("error", {
                        message: "Failed to fetch restaurants",
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching restaurants:", error);
                res.status(500).render("error", {
                    message: "An error occurred while fetching restaurants",
                });
            });
    })
    .get("/all-dishes", (req, res) => {
        axios
            .get(`${process.env.API_BASE_URL}/api/dish-rest`)
            .then((response) => {
                if (response.data.status) {
                    const dishes = response.data.data;
                    let userId = -1;
                    if (req.user) {
                        userId = req.user.id;
                    }
                    // console.log(dishes[1]);
                    res.render("all-dishes", {
                        dishes: dishes,
                        userid: userId,
                    });
                } else {
                    console.error("API returned a failure status");
                }
            })
            .catch((error) => {
                console.error("Error fetching dishes:", error);
            });
    })
    .get("/cart/:id", (req, res) => {
        axios
            .get(`${process.env.API_BASE_URL}/api/cart/${req.params.id}`)
            .then((response) => {
                if (response.data.status) {
                    const data = response.data.data;
                    return res.status(200).render("new-cart", {
                        data: data,
                        user_id: req.user.id,
                    });
                } else {
                    console.error("API returned a failure status");
                    return res.status(400).render("error", {
                        message: "Failed to fetch cart data",
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
                const statusCode = error.response?.status || 500;
                return res.status(statusCode).render("error", {
                    message: "Error loading cart",
                });
            });
    })
    .get("/order/:id", async (req, res) => {
        const api_url = `${process.env.API_BASE_URL}/api/order/${req.params.id}`;
        console.log(`API URL: ${api_url}`);
        const response = await axios.post(api_url);
        return res.status(200).render("order", {
            data: response.data,
            user_id: req.params.id,
        });
    });
module.exports = viewRouter;
