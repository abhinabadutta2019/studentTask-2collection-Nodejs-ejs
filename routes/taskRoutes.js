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

// post route
//task form in student detail page
router.post("/form", async (req, res) => {
  console.log(req.query);

  // const task = await Task.create({
  //   name: req.query.taskName,
  //   completed: req.query.completed,
  //   postedBy: req.query.studentId,
  // });
  // console.log(task, "task");

  //
  // const populatedTask = await Task.findById({ _id: task.id }).populate(
  //   "postedBy"
  // );
  // console.log(populatedTask, "populatedTask");

  //
  const taskofSameId = await Task.find({
    postedBy: req.query.studentId,
  });
  //
  console.log(taskofSameId.length, "false11");
  res.send();
});

//

//
router.get("/allTasksThisUser", async (req, res) => {
  // console.log(req.url);
  // console.log(req.query.studentId);
  // const taskofSameId = await Task.find({
  //   postedBy: req.query.studentId,
  // });
  //
  // console.log(taskofSameId, "false11");

  res.send();
  // res.render("index.ejs");
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
