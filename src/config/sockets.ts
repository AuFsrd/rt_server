import { Server as SocketServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { registerEvents } from "./routes";

export const createIo = (server: HttpServer) => {
    const io = new SocketServer(server, {
        cors: { origin: "http://localhost:3000" },
    });
    const onConnection = (socket: Socket) => {

        // Associate the user to their socket
        socket.data.user = {
            username: socket.handshake.query.username,
            avatar: socket.handshake.query.username,
            id: socket.id,
        };
        registerEvents(io, socket);
    };
    io.on("connection", onConnection);

    return io;
}