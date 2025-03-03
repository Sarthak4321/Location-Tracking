const express = require('express');
const app = express();
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engien", "ejs");
app.set
app.get("/", (req, res) => {
    res.send("i'm hare");
    console.log("listening...");
});

app.listen(3000);