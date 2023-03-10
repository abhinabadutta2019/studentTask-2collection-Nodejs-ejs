const express = require("express");
const Task = require("../model/task");
const Student = require("../model/student");
const router = express.Router();

//get route
router.get("/", async (req, res) => {
  const tasks = await Task.find({});
  const students = await Student.find({});
  //   res.render("index.ejs", { tasks: tasks, students: students });
  console.log(tasks);
  res.send();
});

//

router.get("/create", async (req, res) => {
  const task = await Task.create({
    name: "new111 vv",
    completed: true,
    postedBy: "640b94a89ab03c7e6d4f10bf",
  });
  console.log(task);
  res.send();
});

router.get("/populate", async (req, res) => {
  const task = await Task.find({ _id: "640b97e575a15356ce14f857" }).populate(
    "postedBy"
  );
  console.log(task);
  res.send();
});

// seed route
router.get("/seed", async (req, res) => {
  //delete all existing
  await Task.deleteMany({});

  //add sample
  await Task.create([
    { name: "new ta" },
    // { name: "new vv", completed: true },
    // { name: "new gyy" },
  ]);
  //redirect
  res.redirect("/tasks");
});

//export
module.exports = router;
