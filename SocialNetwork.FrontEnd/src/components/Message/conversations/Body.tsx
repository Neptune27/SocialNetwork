"use client";

import useConversation from "@/hooks/useConversation";
// import { pusherClient } from "@/libs/pusher";
// import { FullMessageType } from "@/type";
import axios from "axios";
// import { find } from "lodash";
import { useEffect, useRef, useState } from "react";

import MessageBox from "./MessageBox";
import { IMessage } from "@/interfaces/IMessage";
import useMessageHub from "@/hooks/useMessageHub";
import { api, ApiEndpoint } from "@/api/const";

type Props = {
  initialMessages: IMessage[];
};

function Body({ initialMessages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const mHub = useMessageHub();

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    if (mHub.hub == null) {
      return
    }

    // mHub.hub.on()
    // pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: IMessage) => {
      axios.post(`${api(ApiEndpoint.MESSAGING)}/seen`, {
        id: conversationId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setMessages((current) => {
        if (current.find(c => c.Id == message.Id)) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: IMessage) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.Id === newMessage.Id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    // pusherClient.bind("messages:new", messageHandler);
    // pusherClient.bind("message:update", updateMessageHandler);

    // return () => {
    //   pusherClient.unsubscribe(conversationId);
    //   pusherClient.unbind("messages:new", messageHandler);
    //   pusherClient.unbind("message:update", updateMessageHandler);
    // };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto dark:bg-black">
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={message.Id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}

export default Body;
