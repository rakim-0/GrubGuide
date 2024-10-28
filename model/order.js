// orders
//     id (primary key, unique identifier for each order)
//     cart_id (foreign key referencing the cart table)
//     user_id (foreign key referencing the users table)
//     subtotal
//     total_price
//     total_taxes
//     total_shipping
//     total_discount_percentage
//     created_at (timestamp for when the order was placed)
//     updated_at (timestamp for when the order was last updated)

const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

const Order = sequelize.define("Orders", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    orderItemsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 99999,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 99999,
    },
    subtotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 99999,
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 99999,
    },
    totalShipping: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 99999,
    },
    total_discount_percentage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 99999,
    }
});

module.exports = Order;
