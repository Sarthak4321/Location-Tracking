const express = require('express');
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");


const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.set(express.static(path.join(__dirname, "public")));


io.on("connection", (socket) => {
    socket.on("sending-location", (data) => {
        io.emit("spreading-location", {id: socket.id, ...data});
    })

    socket.on("user-disconnected", () => {
        io.emit("user-disconnected", socket.id);
    })
});

app.get("/", (req, res) => {
    res.render("index");
    
});

server.listen(3000);