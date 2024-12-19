/*

MariaDB [grubguide]> desc OrderItems;
+-------------------+----------+------+-----+---------+----------------+
| Field             | Type     | Null | Key | Default | Extra          |
+-------------------+----------+------+-----+---------+----------------+
| id                | int(11)  | NO   | PRI | NULL    | auto_increment |
| order_id          | int(11)  | NO   |     | NULL    |                |
| dish_id           | int(11)  | NO   |     | 999999  |                |
| quantity          | int(11)  | NO   |     | 999999  |                |
| price_at_purchase | double   | NO   |     | 999999  |                |
+-------------------+----------+------+-----+---------+----------------+

MariaDB [grubguide]> desc Orders;
+-------------+----------+------+-----+---------+----------------+
| Field       | Type     | Null | Key | Default | Extra          |
+-------------+----------+------+-----+---------+----------------+
| id          | int(11)  | NO   | PRI | NULL    | auto_increment |
| user_id     | int(11)  | NO   |     | 99999   |                |
| total_price | double   | YES  |     | 99999   |                |
+------------+----------+------+-----+---------+-----------------+

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
const sequelize = require("../db/sequelize-connection.js");
const { Sequelize, where } = require("sequelize");
const Order = require("../model/order");
const OrderItem = require("../model/orderItem");
const Cart = require("../model/cart");

exports.addToOrder = async (req, res) => {
    /*
        input: userId
        output: all the items from the cart should be moved to orderItems having same orderid

        first get all dishes from Cart table
        create and get order id from order table
        insert dishes in Order Items 
        update price after inserting dishes in order items.
    */
    //select dish_id, price, quantity from Carts join Dishes on Dishes.id = Carts.dish_id;

    const user_id = req.params.id;
    const cart_items = await sequelize.query(
        `
        SELECT dish_id, price, quantity, name
        FROM Carts 
        JOIN Dishes ON Dishes.id = Carts.dish_id
        WHERE Carts.user_id = :userId
      `,
        {
            replacements: { userId: user_id },
            type: Sequelize.QueryTypes.SELECT,
        }
    );
    if (cart_items.length == 0) {
        return res.status(400).json({ message: "Cart is Empty" });
    }
    let total_price = 0;
    for (const item of cart_items) {
        total_price += item["price"] * item["quantity"];
    }
    let order_entry = await Order.create({
        user_id: user_id,
        total_price: total_price,
    });
    order_id = order_entry.get({ plain: true })["id"];
    let order_items = [];
    for (const item of cart_items) {
        const order_item_row = await OrderItem.create({
            order_id: order_id,
            dish_id: item["dish_id"],
            quantity: item["quantity"],
            price_at_purchase: item["price"],
        });
        let order_item = order_item_row.get({ plain: true });
        order_item["dish_name"] = item["name"];
        order_items.push(order_item);
    }
    // await Cart.destroy({
    //     where: {
    //         user_id: user_id,
    //     },
    // });
    return res.status(200).json(order_items);
};
