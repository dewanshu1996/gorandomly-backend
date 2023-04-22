const Task = require("../model/task.model");

exports.findResult = async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (task.totalParticipants !== task.options.length) {
      return res
        .status(500)
        .send({ message: "Few people left for participation" });
    }
    let max = task.options.length;
    let index = Math.random();
    index = Math.floor(index * max);
    const io = req.app.get("socketio");
    io.to(_id).emit("result_send", {
      message: "ok",
      result: task.options[index],
    });
    return res.status(200).send("ok");
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "Invalid Id" });
  }
};
