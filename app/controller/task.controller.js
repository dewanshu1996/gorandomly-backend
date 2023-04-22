const Task = require("../model/task.model");

exports.updateTaskById = async (req, res) => {
  const { name, choice } = req.body;
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (task.totalParticipants === task.options.length) {
      return res.status(500).send({ message: "Maximum limit reached" });
    }
    task.options.push({
      name: name,
      choice: choice,
    });
    task.save();
    console.log(task);
    return res.status(200).send({
      message: "Your response is captured successfully",
      id: task._id,
      name: task.name,
    });
  } catch (e) {
    return res.status(404).send({ message: "Invalid Id" });
  }
};

exports.createTak = async (req, res) => {
  try {
    console.log(req.body);
    const { name, choice, maxParticipants } = req.body;
    const task = new Task(req.body);
    task.options.push({
      name: name,
      choice: choice,
    });
    console.log(task);
    await task.save();
    res.status(201).send({
      message: "Task created successfully",
      id: task._id,
      link: `http://localhost:8000/api/task/join/${task._id}`,
      name: task.name,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Task creation failed" });
  }
};

exports.joinTaskByCode = async (req, res) => {};

exports.joinTaskByLink = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (task) {
      res.writeHead(302, {
        Location: `http://localhost:8000/frontend/initiate/${_id}`,
      });
      res.send();
    }
  } catch (error) {
    res.status(404).send({ message: "Not found" });
  }
};

exports.getTaskById = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (task) {
      console.log(task);
      res.status(200).send({ task: task.toJSON(), message: "1 record found" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "Not found" });
  }
};
