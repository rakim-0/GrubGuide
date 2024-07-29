const express = require("express");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/user");

const app = express();

const menuRouter = require("./routes/menu");
const dishRouter = require("./routes/dish");
const restaurantRouter = require("./routes/restaurant");
const syncDatabase = require("./db/sync-databases");

app.use(express.json());

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    if (req.user) {
        console.log(req.user);
        res.locals.currentUser = req.user;
    }
    next();
});
app.use([menuRouter, dishRouter, restaurantRouter]);

app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index.ejs");
});

syncDatabase()
    .then(() => {
        app.listen(8080, () => {
            console.log("Server is listening on port 8080");
        });
    })
    .catch((error) => {
        console.error("Failed to sync database:", error);
    });

app.post("/sign-up", async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        if (user) return res.json(user);
        return new error("user could not be created");
    } catch (err) {
        return next(err);
    }
});
app.post(
    "/log-in",
    passport.authenticate("local", {
        successRedirect: "/success",
        failureRedirect: "/failure",
    })
);
app.get("/success", (req, res) => {
    return res.json({ user: res.locals.currentUser });
});
passport.use(
    new LocalStrategy(async (username, password, done) => {
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
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
