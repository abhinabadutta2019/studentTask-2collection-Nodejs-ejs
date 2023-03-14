const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },

  taskCreated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
});

//
const Student = mongoose.model("Student", studentSchema);
//
module.exports = Student;
