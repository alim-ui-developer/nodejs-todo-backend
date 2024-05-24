const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema({
  task:{
      type:String,
      require:true
  },
  isComplete: {
      type: Boolean,
      default: false
  },
},{ timestamps: true }) // timestemps:true이면 스키마를 만든 후에 몇시에 만들어져있는지 시간을 기록한다.

// 실제 데이터가 들어갈 모델 만들기
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;