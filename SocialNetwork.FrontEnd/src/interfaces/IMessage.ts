export const enum EMessageType {
    Message = 0,
    Media = 1,
}

export interface IMessage {
    Id: number,
    Content: string,
    MessageType: EMessageType,
    CreatedAt: number,
    LastUpdated: number,
    User: IMessageUser,
    Room: {
        Id: string
    }
 }

export interface IMessageUser {
    Id: string,
    Name: string,
    Picture: string

}

export interface IRoom {
    CreatedBy: string,
    Users: IMessageUser[],
    Messages: IMessage[],
    Id: string,
    LastSeen: number,
    Profile: string,
    Name: string
}