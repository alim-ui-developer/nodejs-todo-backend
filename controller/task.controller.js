const Task = require('../model/Task');
const taskController = {}

taskController.createTask = async (req, res) => {
  try{
    const { task, isComplete } = req.body;
    const newTask = new Task({task, isComplete});
    await newTask.save();
    res.status(200).json({ status: 'ok', data: newTask});
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err});
  }
}

taskController.getTask = async (req, res) => {
  try{
    // const taskList = await Task.find({}); // 조건 없이 모든 리스트 가져오기
    const taskList = await Task.find({}).select("-__v"); // data에서 select()안에 있는 key값을 빼기
    res.status(200).json({ status: "ok", data: taskList});
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err});
  }
}

taskController.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      throw new Error("App can not find the task");
    }
    const fields = Object.keys(req.body);
    fields.map((item) => (task[item] = req.body[item]));
    await task.save();
    res.status(200).json({ status: "success", data: task });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
}


taskController.deleteTask = async (req, res) => {
  try{
    const deleteItem = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: deleteItem });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err});
  }
}


module.exports = taskController;