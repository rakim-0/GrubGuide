// menuController.js
const Menu = require("../model/menu");
const { make } = require("simple-body-validator");
const { creationRule, updationRule } = require("./rules/menu");

exports.createMenu = async (req, res) => {
    // console.log(req.body);
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new Error("Request body is empty");
        }
        const validator = make(req.body, creationRule);
        if (!validator.validate()) {
            return res
                .status(400)
                .json({ "Errors: ": validator.errors().all() });
        }
        const newMenu = await Menu.create(req.body);
        return res.status(201).json(newMenu);
    } catch (error) {
        console.log("Error:", error);
        return res.status(400).json({ message: error.message });
    }
};

exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll();
        return res.json(menus);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateMenu = async (req, res) => {
    try {
        const validator = make(req.body, updationRule);
        if (!validator.validate()) {
            return res
                .status(400)
                .json({ "Errors: ": validator.errors().all() });
        }
        const [updatedRowsCount, updatedMenus] = await Menu.update(req.body, {
            where: { id: req.body.id },
            returning: true,
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: "Menu not found" });
        }

        return res.json({ msg: "Successfully Updated!" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.getMenuById = async (req, res) => {
    try {
        const validator = make(req.params, updationRule);
        if (!validator.validate()) {
            return res
                .status(400)
                .json({ "Errors: ": validator.errors().all() });
        }

        const menu = await Menu.findByPk(req.params.id);
        if (menu) {
            return res.json(menu);
        }
        return res.status(404).json({ message: "Menu not found" });
    } catch (error) {
        console.error("Error in getMenuById:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteMenuById = async (req, res) => {
    try {
        const validator = make(req.params, updationRule);
        if (!validator.validate()) {
            return res
                .status(400)
                .json({ "Errors: ": validator.errors().all() });
        }

        const menu = await Menu.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (menu) {
            res.json({
                message: `Menu ${req.params.id} has been deleted successfully!`,
            });
        }
        return res.status(404).json({ message: "Menu not found" });
    } catch (error) {
        console.error("Error in getMenuById:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
