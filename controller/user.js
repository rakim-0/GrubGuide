const User = require("../model/user");

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        if (newUser) {
            return res.status(201).json({ status: true, user: newUser });
        } else {
            return res.status(409).json({ status: false, message: "bad request" });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const userData = await User.findOne({ where: { id: req.params.id }, raw: true });
        if (userData) {
            return res.status(200).json({ msg: "Found", user: userData });
        } else {
            return res.status(404).json({ msg: "Not Found", user: null });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
