import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { HubConnection } from "@microsoft/signalr";
import useMessageHub from "./useMessageHub";
import { IMessageUser } from "@/interfaces/IMessage";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();

  const conn = useMessageHub();

  const [messageConn, setMessageConn] = useState<HubConnection | null>(null);

  useEffect(() => {
    // let channel = activeChannel;
    
    // if (!channel) {
      // channel = pusherClient.subscribe("presence-messenger");
      // setActiveChannel(channel);
    // }

    if (conn.hub == null) {
      return
    }

    // conn.hub.on("pusher:subscription_succeeded", (members: IMessageUser[]) => {
    //   const initialMembers: string[] = [];

    //   members.each((member: Record<string, any>) =>
    //     initialMembers.push(member.id)
    //   );
    //   set(initialMembers);
    // });

    // channel.bind("pusher:member_added", (member: Record<string, any>) => {
    //   add(member.id);
    // });

    // channel.bind("pusher:member_removed", (member: Record<string, any>) => {
    //   remove(member.id);
    // });

    // return () => {
    //   if (activeChannel) {
    //     pusherClient.unsubscribe("presence-messenger");
    //     setActiveChannel(null);
    //   }
    // };
  }, [conn.hub, set, add, remove]);
};

export default useActiveChannel;
