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
  try{
    const { id } = req.params;
    const { task, isComplete } = req.body;

    const post = await Post.findById(id);
  
    // 수정
    post.title = title;
    post.description = description;
    
    await post.save();

    res.status(200).json({ status: "success", data: Post});
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err});
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