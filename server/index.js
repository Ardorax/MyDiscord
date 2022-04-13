const express = require("express");
const app = express()
const port = 3000

const bodyParser = require("body-parser");

const WebSocket = require('ws');
const server = new WebSocket.Server({
    port: 8080
});

let sockets = [];
server.on('connection', function (socket) {
    sockets.push(socket);

    // When you receive a message, send that message to every socket.
    socket.on('message', function (msg) {
        let str = msg.toString();
        let msgPart = str.split(":");
        serverMessages[msgPart[1]].push({author: msgPart[0], content: msgPart.splice(2).join(":")});
        console.log(str);
        sockets.forEach(s => s.send(str));
    });

    // When a socket closes, or disconnects, remove it from the array.
    socket.on('close', function () {
        sockets = sockets.filter(s => s !== socket);
    });
});

let serverMessages = {
    general: [
        { author: "John", content: "Hello" },
        { author: "Jane", content: "Hi" },
    ],
    friends: [
        { author: "John", content: "How are you?" },
    ]
}

app.get("/messages", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("A user join the server");
    res.status(200).json(serverMessages)
})

app.post("/send", bodyParser.json(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (!req.body || !req.body.author || !req.body.content || !req.body.channel) {
        res.status(400).json({ error: "Missing parameters" })
        return;
    }
    console.log(req.body);
    const { author, content, channel } = req.body;
    serverMessages[channel].push({ author, content });
    res.status(200).send();
});

app.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("I listen !");
});

app.listen(port, () => {
    console.log(`App listen on ${port} port!`);
});