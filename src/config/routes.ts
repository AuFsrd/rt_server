import cors from "cors";
import { Server, Socket } from "socket.io";
import { Express } from "express";
import { ClientEvents as ce } from "../types/socketEvents";
import { createRoom, retrieveRoom } from "../controllers/roomController";
import { IRollRequest, IUser } from "../types/types";
import RoomSocketHandler from "../controllers/roomSocketHandler";

const corsOptions = {
    origin: process.env.CLIENT!,
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

export const registerRoutes = (app: Express) => {
    app.route("/rooms")
        .post(cors({ ...corsOptions, methods: ['POST'] }), createRoom)
        .get(cors({ ...corsOptions, methods: ['GET'] }), retrieveRoom);
}


export const registerEvents = (io: Server, socket: Socket) => {
    const handler = new RoomSocketHandler(io);
    socket.on(ce.JOIN, (room: string) => handler.onJoin(socket, room));
    socket.on(ce.UPDATE_USER, (userData: Partial<IUser>) => handler.onUpdateUser(socket, userData));
    socket.on(ce.ROLL, (room: string, rollReq: IRollRequest) => handler.onRoll(socket, room, rollReq));
    socket.on(ce.DISCONNECT, (socket) => handler.onDisconnect);
    io.of("/").adapter.on("leave-room", (room) => handler.onLeaveRoom(room));
}