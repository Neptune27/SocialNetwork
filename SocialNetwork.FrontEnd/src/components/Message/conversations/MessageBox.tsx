"use client";

import clsx from "clsx";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Avatar from "../Avatar";
import ImageModel from "../model/ImageModel";
import { EMessageType, IMessage } from "@/interfaces/IMessage";
import useUsername from "@/hooks/useUsername";

type Props = {
  data: IMessage;
  isLast?: boolean;
};

function MessageBox({ data, isLast }: Props) {
  const username = useUsername();
  const [imageModelOpen, setImageModelOpen] = useState(false);

  const isOwn = username === data?.User?.Name;
  // const seenList = (data.seen || [])
  //   .filter((user) => user.email !== data?.sender?.email)
  //   .map((user) => user.name)
  //   .join(", ");

  const container = clsx(`flex gap-3 p-4`, isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx(`flex flex-col gap-2`, isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100 dark:bg-gray-900",
    data.MessageType == EMessageType.Media ? "rounded-md p-0" : "rounded-2xl py-2 px-3"
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={container}
    >
      <div className={avatar}>
        <Avatar user={data.User} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {data.User.Name}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-300">
            {format(new Date(data.CreatedAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModel
            src={data.MessageType == EMessageType.Media ? data.Content : null}
            isOpen={imageModelOpen}
            onClose={() => setImageModelOpen(false)}
          />
          {data.MessageType == EMessageType.Media ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModelOpen(true)}
              src={data.Content}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div className="max-w-[350px]">{data.Content}</div>
          )}
        </div>
        {/* {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500 dark:text-gray-400">
            {`Seen by ${seenList}`}
          </div>
        )} */}
      </div>
    </motion.div>
  );
}

export default MessageBox;
