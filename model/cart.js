const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

const Dish = require("./dish");
const User = require("./user");
const Cart = sequelize.define("Cart", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
    },
    dishID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mobileNumber: {},
    deliveryLocationLatitude: {},
    deliveryLocationLongitude: {},
});

module.exports = Cart;
