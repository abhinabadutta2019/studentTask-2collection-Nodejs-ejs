const express = require("express");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");
const taskRoutes = require("./routes/taskRoutes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// express app
const app = express();
dotenv.config();

// register view engine
app.set("view engine", "ejs");

//mongoDB cloud
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/studentTaskEJS-26-may?retryWrites=true&w=majority`;
//
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// //Establishing mongoose
///////////////////////////////////////////////////////////////////
// const DATABASE_URL = "mongodb://127.0.0.1:27017/10th-March";
// const CONFIG = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
// // // Establish Connection
// mongoose.connect(DATABASE_URL, CONFIG);

// mongoose.connection
//   .on("open", () => console.log("Connected to Mongoose"))
//   .on("close", () => console.log("Disconnected from Mongoose"));
//////////////////////////////////////////////////////////////////////

//.. Middleware
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
