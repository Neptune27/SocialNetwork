"use client"

import EmptyState from "@/components/Message/EmptyState";
import Body from "@/components/Message/conversations/Body";
import Form from "@/components/Message/conversations/Form";
import Header from "@/components/Message/conversations/Header";
import { EMessageType, IMessage, IRoom } from "@/interfaces/IMessage";
import { useState } from "react";

interface IParams {
  conversationId: string;
}

const ConversationId = ({ params }: { params: IParams }) => {
  const [room, setRoom] = useState<IRoom>({
    CreatedBy: "a",
    Id: "1",
    LastSeen: Date.now(),
    Messages: [],
    Name: "A",
    Profile: "",
    Users: []
  })
  const [messages, setMessages] = useState<IMessage[]>([{
    Content: "He",
    Id: 1,
    CreatedAt: Date.now(),
    LastUpdated: Date.now(),
    MessageType: EMessageType.Message,
    User: {
      Id: "a",
      Name: "ccas",
      Picture: ""
    },
    Room: {
      Id: "a"
    }
  }])


  if (room == null) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={room} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
