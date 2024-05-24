const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
  task: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    required: true,
  }
})

// 실제 데이터가 들어갈 모델 만들기
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;