require("dotenv").config();
require("./app/config/mongoose.config");

const socketIO = require("socket.io");
const http = require("http");
const path = require("path");

const express = require("express");
const next = require("next");
const router = require("./app/routes");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

const dev = process.env.NODE_ENV !== "production";
console.log(dev);
const frontend = next({ dev, dir: "./frontend" });
const handle = frontend.getRequestHandler();

app.use(express.json());
app.use(cors());
app.use("/api", router);

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.set("socketio", io);
app.use(handle);
app.use("*", (req, res) => {
  return app.render(req, res, "/");
});

require("./app/config/socket.config")(io);

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
