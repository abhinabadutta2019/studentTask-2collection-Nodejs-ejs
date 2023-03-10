const express = require("express");
const Student = require("../model/student");
const Task = require("../model/task");
const router = express.Router();

//Routers
//get route
router.get("/", async (req, res) => {
  const tasks = await Task.find({});
  const students = await Student.find({});
  res.render("index.ejs", { tasks: tasks, students: students });
});

//seed route
router.get("/seed", async (req, res) => {
  //delete all existing
  await Student.deleteMany({});

  //add sample
  await Student.create([
    { name: "abc", password: "1a" },
    { name: "def", password: "sa" },
    { name: "ghi", password: "sdaf" },
  ]);
  //redirect
  res.redirect("/students");
});

//export
module.exports = router;
