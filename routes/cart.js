const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controller/dish");

cartRouter
    .post("/api/cart", cartController.addToCart)
    .get("/api/dish", dishController.getCartDetails)
    .patch("/api/dish", dishController.updateCart);

module.exports = cartRouter;
