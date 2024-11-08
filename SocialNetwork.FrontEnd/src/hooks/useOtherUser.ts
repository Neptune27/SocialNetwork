"use client"

import { IMessageUser, IRoom } from "@/interfaces/IMessage";
import { useMemo } from "react";
import useUsername from "./useUsername";

const useOtherUser = (
  conversation: IRoom | { users: IMessageUser[] }
) => {
  const username = useUsername();

  const otherUser = useMemo(() => {
    // const currentUsername = localStorage.getItem("username");
    
    console.log("Conv");
    console.log(conversation);
    console.log(username)
    

    const otherUser = conversation.users.filter(
      (user) => user.name !== username
    );

    return otherUser[0];
  }, [conversation.users]);
  console.log("Other")
  console.log(otherUser)
  return otherUser;
};

export default useOtherUser;
