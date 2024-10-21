// -- Order
//     -- order.id : auto increment
//     -- user.id
//     -- dish.id
//     -- quantity
//     -- if user.id == -1, then store mobile number and email address
//     -- transaction.id

const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        defaultValue: -1, // indicate no userId
    },
    dishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 999999,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 999999,
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "<stripe_UUID>",
    },
});

module.exports = Order;
