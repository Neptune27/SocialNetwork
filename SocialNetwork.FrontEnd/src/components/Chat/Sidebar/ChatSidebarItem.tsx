"use client"

import { EMessageType, IRoom } from "@/interfaces/IMessage"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar"
import { MoreHorizontal } from "lucide-react"
import { Avatar } from "../../ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { useParams, useRouter } from "next/navigation"
import useCurrentRoom from "../../../hooks/useCurrentRoom"
import { ContextMenu, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "../../ui/context-menu"
import { ContextMenuContent } from "@radix-ui/react-context-menu"

type Props = {
    room: IRoom
}

const ChatSidebarItem = ({ room }: Props) => {
    const lastMessage = room.messages[0]
    const params = useParams()
    const router = useRouter()
    const currentRoom = useCurrentRoom()
    const handleClick = () => {
        if (params.id == room.id) {
            return
        }

        currentRoom.set(room)
        router.push(`/Chat/${room.id}`)
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton size="xl" onClick={handleClick} asChild>
                <div className="flex gap-1">
                    <Avatar>
                        <AvatarImage src={`${room.profile}`} />
                    </Avatar>
                    <div className="w-4/6">
                        <div className="text-xl font-semibold">{room.name}</div>
                        <div className="truncate">{lastMessage == null ? "Start a chat" : lastMessage.messageType == EMessageType.Media ? "Media" : lastMessage.content}</div>
                    </div>
                </div>

            </SidebarMenuButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem>
                        <span>Call</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    )

}

export default ChatSidebarItem