const express = require('express');
const http = require('http');
const {Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} joined`);

    socket.on('message', msg => {
        socket.broadcast.emit('message:received', msg);
    })

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} left!`);
    })
})

server.listen(3000, () => console.log('server running on port 3000'))