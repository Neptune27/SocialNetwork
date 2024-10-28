"use client";

import useOtherUser from "@/hooks/useOtherUser";
// import { FullConversationType } from "@/type";
import clsx from "clsx";
import { format } from "date-fns";
import { motion } from "framer-motion";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Avatar from "./Avatar";
import AvatarGroup from "./AvatarGroup";
import { EMessageType, IRoom } from "@/interfaces/IMessage";

type Props = {
  data: IRoom;
  selected?: boolean;
};

function ConversationBox({ data, selected }: Props) {
  const router = useRouter();
  const otherUser = useOtherUser(data);
  // const session = useSession();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.Id}`);
  }, [data.Id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.Messages || [];

    return messages[messages.length - 1];
  }, [data.Messages]);

  // const userEmail = useMemo(() => {
  //   return session.data?.user?.email;
  // }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    // const seenArray = lastMessage.seen || [];

    // if (!userEmail) {
    //   return false;
    // }
    return data.LastSeen > lastMessage.LastUpdated
    // return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.MessageType === EMessageType.Media) {
      return "Media";
    }

    if (lastMessage?.Content) {
      return lastMessage.Content;
    }

    return "Started a Conversations";
  }, [lastMessage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 dark:bg-black dark:hover:bg-neutral-900 rounded-lg transition cursor-pointer`,
        selected
          ? "bg-neutral-100 dark:bg-neutral-900"
          : "bg-white dark:bg-black"
      )}
    >
      {data.Users.length > 2 ? (
        <AvatarGroup name={data.Name} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-0">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md text-gray-900 dark:text-gray-100 font-medium truncate">
              {data.Name || otherUser.Name}
            </p>
            {lastMessage?.CreatedAt && (
              <p className="text-xs text-gray-400 font-light dark:text-gray-300 pl-2">
                {format(new Date(lastMessage.CreatedAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen
                ? "text-gray-500 dark:text-gray-400"
                : "text-black dark:text-white font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ConversationBox;
