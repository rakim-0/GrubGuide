/*

MariaDB [grubguide]> desc OrderItems;
+-----------------+----------+------+-----+---------+----------------+
| Field           | Type     | Null | Key | Default | Extra          |
+-----------------+----------+------+-----+---------+----------------+
| id              | int(11)  | NO   | PRI | NULL    | auto_increment |
| orderId         | int(11)  | NO   |     | NULL    |                |
| dishId          | int(11)  | NO   |     | 999999  |                |
| quantity        | int(11)  | NO   |     | 999999  |                |
| priceAtPurchase | double   | NO   |     | 999999  |                |
+-----------------+----------+------+-----+---------+----------------+

MariaDB [grubguide]> desc Orders;
+------------+----------+------+-----+---------+----------------+
| Field      | Type     | Null | Key | Default | Extra          |
+------------+----------+------+-----+---------+----------------+
| id         | int(11)  | NO   | PRI | NULL    | auto_increment |
| userId     | int(11)  | NO   |     | 99999   |                |
| totalPrice | double   | YES  |     | 99999   |                |
+------------+----------+------+-----+---------+----------------+

MariaDB [grubguide]> desc Carts;
+-----------+----------+------+-----+---------+----------------+
| Field     | Type     | Null | Key | Default | Extra          |
+-----------+----------+------+-----+---------+----------------+
| id        | int(11)  | NO   | PRI | NULL    | auto_increment |
| user_id   | int(11)  | NO   |     | NULL    |                |
| dish_id   | int(11)  | NO   |     | NULL    |                |
| quantity  | int(11)  | NO   |     | NULL    |                |
+-----------+----------+------+-----+---------+----------------+

*/

require("dotenv").config();

const { Sequelize, where } = require("sequelize");
const Order = require("../model/order");
const OrderItem = require("../model/orderItem");
const DishController = require("../controller/dish.js");

exports.addToOrder = async (req, res) => {
    /*
        input: userId
        output: all the items from the cart should be moved to orderItems having same orderid

        first get all dishes from Cart table
        create and get order id from order table
        insert dishes in Order Items 
    */
    const userId = req.params.id;
};
