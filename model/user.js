// -- Users
//     -- Id
//     -- Rest. ID
//     -- Name
//     -- Password

const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

const User = sequelize.define("User", {
    rest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER, // 0 = Admin, 1 = Restaurant Owners
        allowNull: false,
    },
});
module.exports = User;
