const express = require('express');
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");


const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));


io.on("connection", (socket) => {
    console.log("a user connected");
})

app.get("/", (req, res) => {
    res.render("index");
    
});

server.listen(3000);
