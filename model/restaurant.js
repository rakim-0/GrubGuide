const DataTypes = require("sequelize");
const sequelize = require("../db/sequelize-connection");

// -- Basic Information (Zomato signup page)
//     -- name
//     -- address
//     -- ratings
//     -- contact email
//     -- contact name
//     -- contact phone
//     -- delivery_ratings
//     -- open time
//     -- close time
//     -- lat long
//     -- tags

const Restaurant = sequelize.define("Restaurant", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNULL: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNULL: false,
  },
  average_ratings: {
    type: DataTypes.DECIMAL(3, 1),
  },
  total_ratings: {
    type: DataTypes.DECIMAL(3, 1),
  },
  contact_email: {
    type: DataTypes.STRING(255),
    allowNULL: false,
  },
  contact_name: {
    type: DataTypes.STRING(255),
    allowNULL: false,
  },
  contact_phone: {
    type: DataTypes.STRING(10),
    allowNULL: false,
  },
  delivery_ratings: {
    type: DataTypes.DECIMAL(2, 1),
  },
  open_time: {
    type: DataTypes.DATE,
    allowNULL: false,
  },
  closing_time: {
    type: DataTypes.DATE,
    allowNULL: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 7),
    allowNULL: false,
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 7),
    allowNULL: false,
  },
  tags: {
    type: DataTypes.TEXT,
    allowNULL: false,
  },
});
// console.log(restaurant == sequelize.models.restaurant);
module.exports = Restaurant;
