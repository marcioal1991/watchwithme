const express = require("express");
const app = express();
const hostname = "0.0.0.0";
const port = 80;
const path = require('path');
const http = require('http').Server(app);
const io = require("socket.io")(http);

app.use(express.static(path.resolve(__dirname, '.')));

let users = [];

io.on('connection', function(client) {
    let data = {
        id: client.id
    };

    users.push(data);
    client.broadcast.emit('user-enter', data);
    
    console.log(users);
    setTimeout(() => {
        client.emit('welcome-user', users.filter((item) => {
            return item.id !== client.id
        }));
    }, 1000)
    

    client.on("send-message", function(message) {
        client.broadcast.emit("receive-message", {
            id: client.id,
            message: message
        });
    });

    client.on("send-image", function (image) {
        client.broadcast.emit("receive-image", {
            id: client.id,
            image: image
        });
    });

    client.on("send-video", function (video) {
        client.broadcast.emit("receive-video", {
            id: client.id,
            video: video
        });
    });
    client.on("user-start-writting", function() {
        client.broadcast.emit("user-start-writting", {
            id: client.id
        });
    });
    client.on("user-stop-writting", function() {
        client.broadcast.emit("user-stop-writting", {
            id: client.id
        });
    });
    
    client.on("user-set-name", function(name) {
        users = users.map(function(item) {
            if (item.id === client.id) {
                item.name = name;
            }

            return item;
        });
        client.broadcast.emit("user-set-name", {
            id: client.id,
            name: name
        });
    });

    client.on("disconnect", function() {
        users = users.filter((item) => {
            if (item.id === client.id) {
                return false;
            }

            return item;
        });

        client.broadcast.emit("user-leave", {
            id: client.id
        });
    });
});

http.listen(port, hostname);
