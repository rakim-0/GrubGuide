// RestaurantController.js
const { Restaurant } = require("../model/restaurant");
const { make } = require("simple-body-validator");

exports.createRestaurant = async (req, res) => {
    const rules = {
        name: "required|string",
        address: "required|string",
        average_ratings: "numeric|min:0|max:5",
        total_ratings: "numeric|min:0",
        contact_email: "required|email",
        contact_name: "required|string",
        contact_phone: "required|string|min:10|max:10",
        delivery_ratings: "numeric|min:0|max:5",
        open_time: "required|date",
        closing_time: "required|date",
        latitude: "required|numeric",
        longitude: "required|numeric",
        tags: "required|string",
    };
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Request body is empty");
        }
        const validator = make(req.body, rules);
        if (!validator.validate()) {
            res.status(400).json({ Errors: validator.errors().all() });
        } else {
            const newRestaurant = await Restaurant.create(req.body);
            res.status(201).json(newRestaurant);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error.message });
    }
};

exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRestaurant = async (req, res) => {
    const rules = {
        id: "required|integer",
        name: "string",
        address: "string",
        average_ratings: "numeric|min:0|max:5",
        total_ratings: "numeric|min:0",
        contact_email: "email",
        contact_name: "string",
        contact_phone: "string|min:10|max:10",
        delivery_ratings: "numeric|min:0|max:5",
        open_time: "date",
        closing_time: "date",
        latitude: "numeric",
        longitude: "numeric",
        tags: "string",
    };
    const validator = make(req.body, rules);
    if (!validator.validate()) {
        res.status(400).json({ Errors: validator.errors().all() });
    } else {
        try {
            const [updatedRowsCount, updatedRestaurants] =
                await Restaurant.update(req.body, {
                    where: { id: req.body.id },
                    returning: true,
                });

            if (updatedRowsCount === 0) {
                return res
                    .status(404)
                    .json({ message: "Restaurant not found" });
            }

            res.json({ msg: "Successfully Updated!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

exports.getRestaurantById = async (req, res) => {
    const rules = {
        id: "required|integer",
    };

    try {
        const validator = make(req.params, rules);
        if (!validator.validate()) {
            return res.status(400).json({ Errors: validator.errors().all() });
        }

        const restaurant = await Restaurant.findByPk(req.params.id);
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ message: "Restaurant not found" });
        }
    } catch (error) {
        console.error("Error in getRestaurantById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
