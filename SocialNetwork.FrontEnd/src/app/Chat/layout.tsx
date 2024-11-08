"use client"

import { api, ApiEndpoint } from "@/api/const";
import ChatSidebar from "@/components/Chat/Sidebar/ChatSidebar";
import { IMessageUser, IRoom } from "@/interfaces/IMessage";
import { authorizedFetch } from "@/Ultility/authorizedFetcher";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import useRooms from "../../hooks/useRooms";
import useMessageHub from "../../hooks/useMessageHub";
import useAuthorizeHub from "../../hooks/useAuthorizeHub";
import { ResizableHandle } from "../../components/ui/resizable";

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

//   const [users, setUsers] = useState<IMessageUser[]>([])
//   //   Id:"1",
//   //   Name: "a",
//   //   Picture: ""
//   // }, {
//   //   Id:"2",
//   //   Name: "a",
//   //   Picture: ""
//   // }])
    const rooms = useRooms()

    const messageHub = useMessageHub()

//   const params = useParams()

   useEffect(()=> {
       const getRoom = async () => {
           const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Room/`)
           const data = await resp.json()
           console.log(data);
           rooms.set(data)
       }

       const hub = useAuthorizeHub(`${api(ApiEndpoint.MESSAGING)}/messagehub`)

       messageHub.set(hub)

       getRoom()
   }, [])

    return (
        <SidebarProvider className="max-h-dvh">
            <ChatSidebar rooms={rooms.rooms} />
            <main className="grow max-h-full min-h-full flex flex-col">
                {children}
            </main>

        </SidebarProvider>

  );
}
