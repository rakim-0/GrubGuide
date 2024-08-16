const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                username: username,
            },
        });
        if (!user) {
            return done(null, false, { message: "Incorrect Username" });
        } else if (user.password != password) {
            return done(null, false, { message: "Incorrect Username" });
        }
        return done(null, user, { message: "Successfully logged in" });
    } catch (err) {
        return done(err);
    }
});
