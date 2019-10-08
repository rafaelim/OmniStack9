const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const http = require('http');
const socketio = require('socket.io');
const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb://mongo:27017/aircnc', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const connectedUsers = {};
io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json()  )
app.use(routes);
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
server.listen(5000, () => console.log("eoq ta ouvindo"));