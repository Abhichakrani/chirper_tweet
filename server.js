const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authMiddleware");
const User = require("./models.js");
require('dotenv').config();
console.log(process.env);

const app = express();
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use(authMiddleware);

// Route for signup page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/signup.html"));
});

// POST route for signup to create a new user in MongoDB
app.post("/signup", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      profileImage: req.body.profileImage,
    });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    res.status(500).send("Error signing up: " + error.message);
  }
});

// Route for login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

// POST route for login to authenticate user and update their login status
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && user.password === req.body.password) {
      user.isLoggedIn = true;
      await user.save();
      res.cookie("username", user.username, {
        maxAge: 1000 * 3600 * 48,
        httpOnly: true,
      });
      res.redirect("/home");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
});

// Route for home page
app.get("/:lang/home", (req, res) => {
  const pageLang = req.params.lang;
  switch (pageLang) {
    case "fr":
      res.sendFile(path.join(__dirname, "/views/home-fr.html"));
      break;
    case "es":
      res.sendFile(path.join(__dirname, "/views/home-es.html"));
      break;
    default:
      res.sendFile(path.join(__dirname, "/views/home.html"));
      break;
  }
});

// Render home view
app.get("/home", (req, res) => {
  res.render("viewData", {
    route: "/home",
    name: `${req.user.firstName} ${req.user.lastName}`,
    username: req.user.username,
    tweets: req.user.tweets,
    isVerified: req.user.isVerified,
  });
});

// Other routes
app.get("/profile", (req, res) => {
  res.render("viewData", {
    route: "/profile",
  });
});

app.get("/explore", (req, res) => {
  res.render("viewData", {
    route: "/explore",
  });
});

app.get("/notifications", (req, res) => {
  res.render("viewData", {
    route: "/notifications",
  });
});

// API route for profile data
app.get("/api/profile", (req, res) => {
  if (req.user) {
    res.json({
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profileImage: req.user.profileImage,
    });
  }
});

// Start server and connect to MongoDB
const start = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    app.listen(8080, () => {
      console.log("Server started on port 8080");
    });
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};

start();
