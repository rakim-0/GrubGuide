const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controller/cart");

cartRouter
    .post("/api/cart", cartController.addToCart)
    .get("/api/cart/:userId", cartController.getCartDetails)
    .patch("/api/cart/:id", cartController.updateCart);

module.exports = cartRouter;
