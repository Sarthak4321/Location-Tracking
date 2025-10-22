const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();

// ✅ Configure view engine & static folder safely
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Basic route
app.get("/", (req, res) => {
  res.render("index");
});

// ✅ Create HTTP server (without .listen)
const server = http.createServer(app);

// ✅ Attach socket.io without specifying a port
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sending-location", (data) => {
    io.emit("spreading-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

// ✅ This is the correct handler for Vercel
module.exports = (req, res) => {
  server.emit("request", req, res);
};
