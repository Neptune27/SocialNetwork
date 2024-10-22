export interface IMessage { }

export interface IMessageUser { }

export interface IRoom {
    CreatedBy: string,
    Users: IMessageUser[],
    Messages: IMessage[]
    

}