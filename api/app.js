require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

// routes representation
const user_route = require("./routes/user_route");
const admin_route = require("./routes/admin_route");

// mongoose connection
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", (error) => console.log("db error: ", error));
db.once("open", () => console.log("db connected"));

app.use("/", user_route);
app.use("/admin", admin_route);

// port
const server = app.listen(process.env.PORT || 3000);
