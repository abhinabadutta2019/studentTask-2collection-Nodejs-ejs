const express = require("express");
const { default: mongoose } = require("mongoose");
const Student = require("../model/student");
const { findByIdAndDelete } = require("../model/task");
const Task = require("../model/task");
const router = express.Router();

//Routers
//"/students"
//get route
router.get("/", async (req, res) => {
  const tasks = await Task.find({});
  const students = await Student.find({});
  res.render("index.ejs", { tasks: tasks, students: students });
});

//get/create route
router.get("/form", (req, res) => {
  res.render("studentForms");
});

//add a student form
router.post("/form", async (req, res) => {
  const studentName = req.query.studentName;
  const studentPassword = req.query.studentPassword;
  // console.log(studentName, studentPassword);
  console.log(req.query);

  await Student.create({ name: studentName, password: studentPassword });

  // console.log(student);

  //
  // await student.save({ a, pass });

  res.send();
});

// student delete method
//delete all tasks created by this student
router.delete("/delete", async (req, res) => {
  try {
    console.log(req.query.studentId, "from backend");

    const deleteStudent = await Student.findByIdAndDelete(req.query.studentId);
    console.log(deleteStudent, "deleteStudent");

    ////
    const deleteAllTaskofThisStudent = await Task.deleteMany({
      postedBy: req.query.studentId,
    });
    console.log(deleteAllTaskofThisStudent, "deleteAllTaskofThisStudent");
    res.send();
  } catch (e) {
    console.log(e);
  }
});
//get single page

router.get("/single/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    // console.log(req.params.id);
    // console.log(student);
    // res.send();
    res.render("studentDetails.ejs", { student: student });
  } catch (e) {
    console.log(e);
  }
});

//seed route
router.get("/seed", async (req, res) => {
  //delete all existing
  await Student.deleteMany({});

  //add sample
  await Student.create([
    { name: "abca", password: "1a" },
    { name: "def", password: "sa" },
    { name: "ghi", password: "sdaf" },
  ]);
  //redirect
  res.redirect("/students");
});

//export
module.exports = router;
