
export enum ClientEvents {
    JOIN = 'join',
    CREATE = 'create',
    UPDATE_USER = 'updateUser',
    ROLL = 'roll',
    DISCONNECT = 'disconnect'
}

export enum ServerEvents {
    CONNECT = 'connection',
    USERS = 'sendUsers',
    RESULT = 'drawResult',
    CREATED = 'created',
    ROOM_NOT_FOUND = 'roomNotFound',
    ROOM_JOINED = 'roomJoined',
}