const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static server
app.use(express.static(path.join(__dirname, 'public')));

//Run when client connects. LIsten to the 'connection' event
io.on('connection', socket=> {
    //Welcome current user
    socket.emit('message', formatMessage('Welcome to Chat-app'));

    //broadcast when a user connects. broadcast to everyone except user who connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    //broadcast to all clients no exception
    // io.emit()

    //runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    //Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));