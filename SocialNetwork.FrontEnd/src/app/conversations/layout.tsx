"use client"

import { api, ApiEndpoint } from "@/api/const";
import ClientOnly from "@/components/Message/ClientOnly";
import ConversationList from "@/components/Message/ConversationList";
import Sidebar from "@/components/Message/sidebar/Sidebar";
import { IMessageUser, IRoom } from "@/interfaces/IMessage";
import { authorizedFetch } from "@/Ultility/authorizedFetcher";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [users, setUsers] = useState<IMessageUser[]>([{
    Id:"1",
    Name: "a",
    Picture: ""
  }, {
    Id:"2",
    Name: "a",
    Picture: ""
  }])
  const [rooms, setRooms] = useState<IRoom[]>([{
    Id: "a",
    LastSeen: Date.now(),
    CreatedBy: "",
    Users: [],
    Messages: [],
    Name: "Hello",
    Profile: ""
  }])

  const params = useParams()

  useEffect(()=> {
    const getRoom = async () => {
      const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Room/`)
      const data = await resp.json()
      console.log(data);
      setRooms(data)
    }
    getRoom()
  })

  return (
    <Sidebar>
      <div className="h-full">
        <ClientOnly>
          <ConversationList users={users} initialItems={rooms} />
        </ClientOnly>
        {children}
      </div>
    </Sidebar>
  );
}
