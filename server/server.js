import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin: 'http://localhost:3000'
    }
});

io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);
    //listen for state update
    socket.on('state', (state,timeStamp) => {
       io.emit('state', state,timeStamp); // broadcast to all user about state update
    })

    socket.on('message', (message) => {
        io.emit('message boardcast', message);
    })
    socket.on('disconnect', (arg) => {
        console.log(`user ${socket.id} disconnected`);
    })
})


httpServer.listen(8000);
