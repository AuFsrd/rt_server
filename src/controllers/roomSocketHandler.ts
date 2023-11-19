import { Server, Socket } from "socket.io";
import { ServerEvents as se } from "../types/socketEvents";
import { activeRooms } from "../data/activeRooms";
import { IRoll, IRollRequest, IUser } from "../types/types";
import { roll } from "../services/roller";

export default class RoomSocketHandler {

    io;
    constructor(io: Server) {
        this.io = io;
        console.log("Hi")
    }

    onJoin = (socket: Socket, room: string) => {
        const user = socket.data.user;
        if (activeRooms.has(room)) {
            console.log(`${user.username} joined room ${room}`);
            socket.join(room);
            socket.emit(se.ROOM_JOINED, room);
            this.sendRoomUsers(room);
        } else {
            socket.emit(se.ROOM_NOT_FOUND);
        }
    };

    onUpdateUser = (socket: Socket, user: Partial<IUser>) => {
        socket.data.user = { ...socket.data.user, ...user };
        for (let room of socket.rooms) {
            this.sendRoomUsers(room);
        }
    };

    onRoll = (socket: Socket, room: string, rollReq: IRollRequest) => {
        const result = roll(rollReq.sides, rollReq.times, rollReq.offset);
        console.log(`${socket.data.user.username} rolled: ${result}`);
        const response: IRoll = { user: socket.data.user, result: result };
        this.io.to(room).emit(se.RESULT, response);
    };

    onLeaveRoom = (room: string) => {
        const roomList = this.io.sockets.adapter.rooms.get(room);
        if (roomList && roomList.size === 0) {
            activeRooms.delete(room);
        } else {
            this.sendRoomUsers(room);
        }
    };

    onDisconnect = (socket: Socket) => {
        console.log(`${socket} disconnected`);
    }

    private  sendRoomUsers = (room: string) => {
        this.io.to(room).emit(se.USERS, this.getRoomUsers(room));
    };

    private getRoomUsers = (room: string) => {
        const clients = this.io.sockets.adapter.rooms.get(room);
        const users: IUser[] = [];

        if (clients) {
            for (let id of clients) {
                const socket = this.io.sockets.sockets.get(id);
                users.push(socket?.data?.user);
            }
        }
        return users;
    };

}