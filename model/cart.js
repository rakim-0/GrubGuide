const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

const Dish = require("./dish");
const User = require("./user");
const Cart = sequelize.define("Cart", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dish_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Cart;
