import { Request, Response } from "express";
import { generateRoomCode } from "../services/roomManager";
import { activeRooms } from "../data/activeRooms";

/**
 * HTTP Method for creating rooms
 */
export const createRoom = (_req: Request, res: Response) => {
    const room = generateRoomCode();
    activeRooms.add(room);
    res.json({ roomCode: room });
};

/**
 * HTTP Method for retrieving rooms
 */
export const retrieveRoom = (req: Request, res: Response) => {
    const roomId: string = (req.query.code as string);
    if (activeRooms.has(roomId)) {
        res.status(200).json("ok");
    } else {
        res.status(404).json("nok");
    }
};