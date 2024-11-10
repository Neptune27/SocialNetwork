import { Plus } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "../../ui/sidebar"
import { DropdownMenu } from "../../ui/dropdown-menu"
import { AlertDialog } from "../../ui/alert-dialog"
import { IRoom } from "@/interfaces/IMessage"
import ChatSidebarItem from "./ChatSidebarItem"

type Props = {
    rooms: IRoom[]
}

const ChatSidebar = ({
    rooms
} : Props) => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Chat</SidebarGroupLabel>
                        <SidebarGroupAction>
                            <Plus /> <span className="sr-only">Add new Room</span>
                        </SidebarGroupAction>
                        <SidebarGroupContent></SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                {/*<SidebarGroup>*/}
                {/*    <SidebarGroupLabel asChild>Chats</SidebarGroupLabel>*/}
                {/*    <SidebarGroupAction title="Create" >*/}
                {/*        <Plus /> <span className="sr-only">Add Project</span>*/}
                {/*    </SidebarGroupAction>*/}
                {/*    */}{/* <p>Ic</p> */}
                {/*    */}{/* Icon and + */}
                {/*</SidebarGroup>*/}

            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {rooms.map(r => <ChatSidebarItem key={r.id} room={r} />)}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}

export default ChatSidebar