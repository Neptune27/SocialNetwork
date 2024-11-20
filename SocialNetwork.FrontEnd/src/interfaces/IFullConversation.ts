import { IMessage, IMessageUser } from "./IMessage";

export interface IFullConvevrsation {
    id: string,
    users: IMessageUser[];
    messages: IMessage[];
  };