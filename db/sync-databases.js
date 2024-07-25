const sequelize = require("./sequelize-connection");
const Menu = require("../model/menu");
const Dish = require("../model/dish");
const Restaurant = require("../model/restaurant");
const User = require("../model/user");

async function syncDatabase() {
    try {
        await sequelize.sync({ force: false });
        console.log("Database & tables created!");
    } catch (error) {
        console.error("Unable to sync database:", error);
    }
}
module.exports = syncDatabase;
