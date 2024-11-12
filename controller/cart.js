const sequelize = require("../db/sequelize-connection.js");
const Sequelize = require("sequelize");
const Cart = require("../model/cart");
const Dish = require("../model/dish");
const Restaurant = require("../model/restaurant");
const { set } = require("mongoose");
exports.getCartDetails = async (req, res) => {
    /*
        Get cart details with restaurant names and 
    */
    /*
        select r.id as restaurant_id, d.id as dish_id, d.name, r.name from Carts 
        join Dishes as d on d.id=dish_id 
        join Restaurants as r on r.id=d.rest_id;
    */
    try {
        // Cart.hasMany(Dish, {
        //     foreignKey: "id",
        //     sourceKey: "dishId",
        // });
        // const cart = await Cart.findAll({
        //     attributes: ["*"],
        //     include: [
        //         {
        //             model: Dish,
        //             required: true,
        //             raw: true,
        //         },
        //     ],
        //     where: { userId: req.params.id },
        //     raw: true,
        //     nest: true,
        // });
        // Dish.belongsTo(Restaurant, { foreignKey: "rest_id", as: "restaurant" });
        // Restaurant.hasMany(Dish, { foreignKey: "rest_id", as: "dishes" });

        // Cart.belongsTo(Dish, { foreignKey: "dish_id", as: "dish" });
        // Dish.hasMany(Cart, { foreignKey: "dish_id", as: "carts" });
        // const cart = await Cart.findAll({
        //     attributes: [
        //         [sequelize.col("restaurant.id"), "restaurant_id"],
        //         [sequelize.col("dish.id"), "dish_id"],
        //         [sequelize.col("dish.name"), "dish_name"],
        //         [sequelize.col("restaurant.name"), "restaurant_name"],
        //     ],
        //     include: [
        //         {
        //             model: Dish,
        //             as: "dish", // Make sure this matches the association alias
        //             attributes: [],
        //             include: [
        //                 {
        //                     model: Restaurant,
        //                     as: "restaurant", // Make sure this matches the association alias
        //                     attributes: [],
        //                 },
        //             ],
        //         },
        //     ],
        //     raw: true,
        // });
        const items = await sequelize.query(
            `
            SELECT price, quantity, r.id AS restaurant_id, d.id AS dish_id, d.name AS dish_name, r.name AS restaurant_name
            FROM Carts
            JOIN Dishes AS d ON d.id = Carts.dish_id
            JOIN Restaurants AS r ON r.id = d.rest_id
            WHERE Carts.user_id = :userId;
          `,
            {
                replacements: { userId: req.params.id },
                type: Sequelize.QueryTypes.SELECT,
            }
        );
        /*
            data format right now:
                    "price": 350,
                    "quantity": 1,
                    "restaurant_id": 1,
                    "dish_id": 1,
                    "dish_name": "Pizza",
                    "restaurant_name": "Tasty Bites"

            after conversion:
                "Tasty Bites" : {
                    {
                        "dish_name": "Pizza",
                        "price": 350,
                        "quantity": 1,
                    },
                    {
                        "dish_name": "Pizza",
                        "price": 350,
                        "quantity": 1,
                    },
                }
        */
        data = {};
        for (const item of items) {
            const dish = {
                dish_name: item["dish_name"],
                price: item["price"],
                quantity: item["quantity"],
            };
            const rest_name = item["restaurant_name"];
            if (!data[rest_name]) {
                data[rest_name] = [];
                data[rest_name].push(dish);
            } else {
                data[rest_name].push(dish);
            }
        }
        return res.status(201).json({ status: true, data: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};
exports.addToCart = async (req, res) => {
    /**
     *  Check if the dish already exists:
     *      if yes then update the counter
     *      else add it to the list
     */

    // const newCartItem = await Cart.create(req.body);
    try {
        const checkCart = await Cart.findOne({
            where: {
                userId: req.body.userId,
                dishId: req.body.dishId,
            },
        });
        let cart;

        if (!checkCart) {
            cart = await Cart.create(req.body);
        } else {
            let newCount = checkCart.count + (req.body.count || 1);
            if (newCount < 0) {
                newCount = 0;
            }
            // console.log(newCount);
            await Cart.update(
                { count: newCount },
                {
                    where: {
                        userId: req.body.userId,
                        dishId: req.body.dishId,
                    },
                }
            );
            cart = await Cart.findOne({
                where: {
                    userId: req.body.userId,
                    dishId: req.body.dishId,
                },
            });
        }

        return res.json({ status: true, data: cart });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
exports.updateCart = async (req, res) => {
    try {
        if (req.body.count && req.body.count < 0) {
            req.body.count = 0;
        }
        const [updatedRowsCount, updatedCarts] = await Cart.update(req.body, {
            where: {
                userId: req.body.userId,
                dishId: req.body.dishId,
            },
            returning: true,
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.json({ status: true, data: updatedCarts });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
