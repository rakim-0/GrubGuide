const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controller/cart");

cartRouter
    .post("/api/cart", cartController.addToCart)
    .get("/api/cart/:id", cartController.getCartDetails)
    .get("/api/cart/numDishes/:id", cartController.getNumDishes)
    .patch("/api/cart/:id", cartController.updateCart);

module.exports = cartRouter;
