export interface IUser {
    id: string,
    username: string,
    avatar: string,
}

export interface IRoll {
    result: number,
    user: IUser,
}

export interface IRoom {
    id: string,
    rollType: IRollType
}

export interface IRollType {
    sides: number
    offset: number
}

export interface IRollRequest extends IRollType {
    times: number
}

export const rollTypes = {
    FUDGE: { sides: 3, offset: -1 },
    D4: { sides: 4, offset: 0 },
    D6: { sides: 6, offset: 0 },
    D8: { sides: 8, offset: 0 },
    D10: { sides: 10, offset: 0 },
    D12: { sides: 12, offset: 0 },
    D20: { sides: 20, offset: 0 },
    D100: { sides: 100, offset: 0 },
}