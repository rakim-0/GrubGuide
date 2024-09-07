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
    dishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.STRING(10),
        // allowNULL: false,
    },
    deliveryLocationLatitude: {
        type: DataTypes.DECIMAL(10, 7),
        // allowNULL: false,
    },
    deliveryLocationLongitude: {
        type: DataTypes.DECIMAL(10, 7),
        // allowNULL: false,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Cart;
