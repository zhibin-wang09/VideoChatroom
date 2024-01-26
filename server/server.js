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
    //listen for state update
    socket.on('state', (state) => {
       io.emit('state', state); // broadcast to all user about state update
    })
})


httpServer.listen(8000);