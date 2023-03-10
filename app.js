const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");
const taskRoutes = require("./routes/taskRoutes");
const bodyParser = require("body-parser");

// express app
const app = express();

//Establishing mongoose
const DATABASE_URL = "mongodb://127.0.0.1:27017/10th-March";
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// // Establish Connection
mongoose.connect(DATABASE_URL, CONFIG);

// register view engine
app.set("view engine", "ejs");

mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"));

// Middleware
// app.use(morgan("tiny")); //logging
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use("/static", express.static("static"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//route file routes
app.use("/students", studentRoutes);
app.use("/tasks", taskRoutes);
//server listener
const PORT = 3008;
app.listen(PORT, console.log("Server start for port: " + PORT));
