// RestaurantController.js
const Restaurant = require("../model/restaurant");
const { make } = require("simple-body-validator");
const { creationRule, updationRule } = require("./rules/restaurant");
exports.createRestaurant = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Request body is empty");
        }

        const { open_time } = req.body;

        const openingTime = new Date("1976-01-01");
        if (open_time) {
            const [hours, minutes] = open_time.split(":");
            openingTime.setHours(hours);
            openingTime.setMinutes(minutes);
        }

        const { closing_time } = req.body;
        const closingTime = new Date("1976-01-01");
        if (closing_time) {
            const [hours, minutes] = closing_time.split(":");
            closingTime.setHours(hours);
            closingTime.setMinutes(minutes);
        }

        req.body.open_time = openingTime;
        req.body.closing_time = closingTime;
        const validator = make(req.body, creationRule);
        if (!validator.validate()) {
            res.status(400).json({ errors: validator.errors().all() });
        } else {
            const newRestaurant = await Restaurant.create(req.body);
            // console.log(newRestaurant.json());
            res.status(201).json({
                status: true,
                data: newRestaurant,
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error.message });
    }
};

exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json({
            status: true,
            data: restaurants,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// TODO: offset the rules variable to a different file inside validations folder.
exports.updateRestaurant = async (req, res) => {
    const validator = make(req.body, updationRule);
    if (!validator.validate()) {
        return res.status(400).json({ errors: validator.errors().all() });
    }
    try {
        const [updatedRowsCount, updatedRestaurants] = await Restaurant.update(
            req.body,
            {
                where: { id: req.body.id },
                returning: true,
            }
        );

        if (updatedRowsCount === 0) {
            return res.status(400).json({ message: "Restaurant not found" });
        }
        return res.json({ message: "Successfully Updated!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getRestaurantById = async (req, res) => {
    try {
        const validator = make(req.params, updationRule);
        if (!validator.validate()) {
            return res.status(400).json({ errors: validator.errors().all() });
        }

        const restaurant = await Restaurant.findByPk(req.params.id);
        if (restaurant) {
            return res.json({
                status: true,
                data: restaurant,
            });
        }
        return res.status(404).json({ message: "Restaurant not found" });
    } catch (error) {
        console.error("Error in getRestaurantById:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteRestaurantById = async (req, res) => {
    try {
        const validator = make(req.params, updationRule);
        if (!validator.validate()) {
            return res.status(400).json({ errors: validator.errors().all() });
        }

        const restaurant = await Restaurant.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (restaurant) {
            return res.json({
                status: true,
                message: `Restaurant ${req.params.id} has been deleted successfully.`,
            });
        }
        return res.status(404).json({ message: "Restaurant not found" });
    } catch (error) {
        console.error("Error in getRestaurantById:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
