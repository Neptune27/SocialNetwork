"use client";

import useOtherUser from "@/hooks/useOtherUser";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

import Avatar from "../Avatar";
import AvatarGroup from "../AvatarGroup";
import ProfileDrawer from "./ProfileDrawer";
import { IMessage, IMessageUser, IRoom } from "@/interfaces/IMessage";
import useActiveList from "@/hooks/useActiveList";

type Props = {
  conversation: IRoom & {
    Users: IMessageUser[];
  };
};

function Header({ conversation }: Props) {
  const otherUser = useOtherUser(conversation);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.Id!) !== -1;
  const [drawerOpen, setDrawerOpen] = useState(false);


  const statusText = useMemo(() => {
    if (conversation.Users.length > 2) {
      return `${conversation.Users.length} Members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white dark:bg-black w-full flex border-b-[1px] dark:border-b-gray-600 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.Users.length  ? (
            <AvatarGroup name={conversation.Name || otherUser.Name} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.Name || otherUser.Name}</div>
            <div className="text-sm font-light text-neutral-500 dark:text-neutral-300">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
        />
      </div>
    </>
  );
}

export default Header;
