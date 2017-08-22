const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

console.log(publicPath);
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage',  generateMessage('Admin', 'New User joined chat rooom'));

    socket.on('createMessage', (message) => {
        console.log('New message ', message);
        io.emit('newMessage',  generateMessage(message.from, message.text));
        });
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime
        //     });
        //});

    socket.on('disconnect', () => {
        console.log('User disconnected from server');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});