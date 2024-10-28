"use client"

import { IMessageUser, IRoom } from "@/interfaces/IMessage";
import { useMemo } from "react";

const useOtherUser = (
  conversation: IRoom | { Users: IMessageUser[] }
) => {
  const otherUser = useMemo(() => {
    // const currentUsername = localStorage.getItem("username");
    

    const otherUser = conversation.Users.filter(
      (user) => user.Name !== "a"
    );

    return otherUser[0];
  }, [conversation.Users]);

  return otherUser;
};

export default useOtherUser;
