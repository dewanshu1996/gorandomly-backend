const Task = require("../model/task.model");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("socket called");
    socket.on("join", async (taskId) => {
      socket.join(taskId);
      try {
        const task = await Task.findById(taskId);
        console.log(task);
        io.to(taskId).emit("participants-list", {
          participantsList: task.participantsList(),
          participantsCount: task.participantsCount,
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
};
