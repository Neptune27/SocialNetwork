"use client";

import useConversation from "@/hooks/useConversation";
// import { pusherClient } from "@/libs/pusher";
// import { FullConversationType } from "@/type";
// import { User } from "@prisma/client";
import clsx from "clsx";
// import { find } from "lodash";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

import ConversationBox from "./ConversationBox";
import GroupChatModal from "./model/GroupChatModal";
import { IMessageUser, IRoom } from "@/interfaces/IMessage";
import { IFullConvevrsation as IFullConversation } from "@/interfaces/IFullConversation";
import { HubConnection } from "@microsoft/signalr";
import useMessageHub from "@/hooks/useMessageHub";

type Props = {
  initialItems: IRoom[];
  users: IMessageUser[];
};

function ConversationList({ initialItems, users }: Props) {
  const router = useRouter();
  // const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { conversationId, isOpen } = useConversation();

  const mHub = useMessageHub();
  // const pusherKey = useMemo(() => {
  //   return session.data?.user?.email;
  // }, [session.data?.user?.email]);

  useEffect(() => {
    if (mHub.hub == null) return;

    // pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: IRoom) => {
      setItems((current) => {
        if (current.find(c => c.Id == conversation.Id)) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: IRoom) => {
      setItems((current) =>
        current.map((currentConversation) => {
          //If Active
          if (currentConversation.Id === conversation.Id) {
            return {
              ...currentConversation,
              messages: conversation.Messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: IRoom) => {
      setItems((current) => {
        return [...current.filter((con) => con.Id !== conversation.Id)];
      });

      if (conversationId === conversation.Id) {
        router.push("/conversations");
      }
    };


    mHub.hub.on("newConversation", newHandler);
    mHub.hub.on("updateConversation", updateHandler);
    mHub.hub.on("removeConversation", removeHandler);

    return () => {
      if (mHub.hub == null) {
        return
      }

      mHub.hub.off("newConversation", newHandler);
      mHub.hub.off("updateConversation", updateHandler);
      mHub.hub.off("removeConversation", removeHandler);
    };
  }, [mHub.hub, router]);

  return (
    <>
      <GroupChatModal
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        users={users}
      />
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 dark:border-gray-700 dark:bg-black`,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
              Messages
            </div>
            <div
              onClick={() => setIsModelOpen(true)}
              className="rounded-full p-2 bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400 cursor-pointer hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.Id}
              data={item}
              selected={conversationId === item.Id}
            />
          ))}
        </div>
      </aside>
    </>
  );
}

export default ConversationList;
