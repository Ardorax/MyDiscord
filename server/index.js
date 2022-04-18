const express = require("express");
const app = express()
const port = 27841

const bodyParser = require("body-parser");

const WebSocket = require('ws');
const server = new WebSocket.Server({
    port: 27842,
});

let sockets = [];
server.on('connection', function (socket) {
    sockets.push(socket);

    // When you receive a message, send that message to every socket.
    socket.on('message', function (msg) {
        let str = msg.toString();
        let msgPart = str.split(":");
        let date = String(new Date().getTime());
        let content = msgPart.splice(2).join(":");

        if (msgPart[0] != "announcement") {
            str = msgPart[0] + ":" + msgPart[1] + ":#fff:" + date + ":" + content
            serverMessages[msgPart[0]].push({ author: msgPart[1], color: "#fff", date: date, content: content });
            sockets.forEach(s => s.send(str));
        } else {
            socket.send("announcement:Server:#f00:000:You can't send messages here !");
        }
    });

    // When a socket closes, or disconnects, remove it from the array.
    socket.on('close', function () {
        sockets = sockets.filter(s => s !== socket);
    });
});

let serverMessages = {
    announcement: [
        {
            author: "<Server>",
            content: "This channel is for important things !",
            color: "#ff0000"
        },
    ],
    general: [
        {
            author: "<Server>",
            content: "This is the main channel",
            color: "#ff0000"
        },
    ],
    random: [{}]
}

app.get("/messages", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("An user join the server");
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
