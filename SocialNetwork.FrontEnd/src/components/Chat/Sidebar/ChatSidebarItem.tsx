"use client"

import { EMessageType, ERoomType, IRoom } from "@/interfaces/IMessage"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar"
import { MoreHorizontal } from "lucide-react"
import { Avatar } from "../../ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { useParams, useRouter } from "next/navigation"
import useCurrentRoom from "../../../hooks/useCurrentRoom"
import { ContextMenu, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "../../ui/context-menu"
import { ContextMenuContent } from "@radix-ui/react-context-menu"
import useUserId from "../../../hooks/useUserId"
import { useModifyRoomDialog, useRenameRoomDialog, useLeaveRoomDialog } from "../../../hooks/Chat/Sidebar/useLeaveRoomDialog"
import { authorizedFetch } from "../../../Ultility/authorizedFetcher"
import { api, ApiEndpoint } from "../../../api/const"
import { toast } from "sonner"

type Props = {
    room: IRoom
}

const ChatSidebarItem = ({ room }: Props) => {
    const lastMessage = room.messages[0]
    const params = useParams()
    const router = useRouter()
    const currentRoom = useCurrentRoom()
    const userId = useUserId()
    const leaveStore = useLeaveRoomDialog()
    const modifyStore = useModifyRoomDialog()
    const renameStore = useRenameRoomDialog()
    const handleClick = () => {
        if (params.id == room.id) {
            return
        }

        currentRoom.set(room)
        router.push(`/Chat/${room.id}`)
    }

    const handleLeave = () => {
        const data = {
            room: room,
            open: true
        }

        leaveStore.set(data)

    }

    const handleRename = () => {
        const data = {
            room: room,
            open: true
        }

        renameStore.set(data)
    }

    const handleModify = () => {
        const data = {
            room: room,
            open: true
        }

        modifyStore.set(data)
    }

    const handleCall = async () => {
        const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Room/Call/${room.id}`, {
            method: "POST"
        })

        if (!resp.ok) {
            toast("Error has occured, cannot make a call")
            return
        }

        window.open(`/CallSimple/${room.id}`, '_blank');
    }

    let finalProfileUrl = ""
    let roomName = room.name

    switch (room.roomType) {
        case ERoomType.Normal:
            const otherUser = room.users.find(u => u.id != userId)

            if (otherUser !== undefined) {
                finalProfileUrl = `${api(ApiEndpoint.PROFILE)}/${otherUser.picture}`
                roomName = otherUser.name
            }
            break
        case ERoomType.Group:
            finalProfileUrl = `${api(ApiEndpoint.MESSAGING)}/${room.profile}`
            break;

        default:
            break;
    }


    return (
        <SidebarMenuItem>
            <SidebarMenuButton size="xl" onClick={handleClick} asChild>
                <div className="flex gap-1">
                    <Avatar>
                        <AvatarImage src={`${finalProfileUrl}`} />
                    </Avatar>
                    <div className="w-4/6">
                        <div className="text-xl font-semibold">{roomName}</div>
                        <div className="truncate">{lastMessage == null ? "Start a chat" : lastMessage.messageType == EMessageType.Media ? "Media" : lastMessage.content}</div>
                    </div>
                </div>

            </SidebarMenuButton>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                        <MoreHorizontal/>
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">

                    {userId == room.createdBy.id && room.roomType == ERoomType.Group
                        ?
                        <DropdownMenuItem onClick={ handleRename}>
                            <span>Rename room</span>
                        </DropdownMenuItem>
                        : null
                    }
                    {userId == room.createdBy.id && room.roomType == ERoomType.Group
                        ?
                        <DropdownMenuItem onClick={handleModify}>
                            <span>Change users</span>
                        </DropdownMenuItem>
                        : null
                    }
                    <DropdownMenuItem onClick={handleCall}>
                        <span>Call</span>
                    </DropdownMenuItem>

                    {room.roomType == ERoomType.Group
                        ?
                        <DropdownMenuItem onClick={handleLeave}>
                            <span>Leave</span>
                        </DropdownMenuItem>
                        : null
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    )

}

export default ChatSidebarItem