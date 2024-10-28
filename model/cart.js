const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

const Dish = require("./dish");
const User = require("./user");
const Cart = sequelize.define("Cart", {
    
});

module.exports = Cart;
