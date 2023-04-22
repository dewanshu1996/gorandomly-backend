const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    purpose: {
      type: String,
      require: true,
    },
    totalParticipants: {
      type: Number,
      require: true,
      default: 2,
    },
    options: [
      {
        name: {
          type: String,
          require: true,
        },
        choice: {
          type: String,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

taskSchema.methods = {
  toJSON: function () {
    var obj = this.toObject();
    delete obj.options;
    delete obj.totalParticipants;
    return obj;
  },
  participantsList: function () {
    var obj = this.toObject();
    console.log(obj);
    return obj.options.map((option) => {
      console.log(option);
      return option.name;
    });
  },
};

taskSchema.post("save", async function (document) {
  if (document.totalParticipants === document.options.length) {
    console.log("Result function called");
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
