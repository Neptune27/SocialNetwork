export const enum EMessageType {
    Message = 0,
    Media = 1,
}

export interface IMessage {
    id: number,
    content: string,
    messageType: EMessageType,
    createdAt: number,
    lastUpdated: number,
    user: IMessageUser,
    room: {
        id: string,
        name: string
    }
 }

export interface IMessageUser {
    id: string,
    name: string,
    picture: string

}

export interface IRoom {
    createdBy: IMessageUser,
    users: IMessageUser[],
    messages: IMessage[],
    id: string,
    lastSeen: number,
    profile: string,
    name: string
}