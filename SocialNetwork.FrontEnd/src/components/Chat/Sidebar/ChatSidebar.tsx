import { Plus } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "../../ui/sidebar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/alert-dialog"
import { IMessageUser, IRoom } from "@/interfaces/IMessage"
import ChatSidebarItem from "./ChatSidebarItem"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Button } from "../../ui/button"
import { useModifyRoomDialog, useRenameRoomDialog, useCallNotifyDialog, useLeaveRoomDialog, useChangeProfileRoomDialog } from "../../../hooks/Chat/Sidebar/useLeaveRoomDialog"
import useRooms from "../../../hooks/useRooms"
import { authorizedFetch } from "../../../Ultility/authorizedFetcher"
import { api, ApiEndpoint } from "../../../api/const"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import useCurrentRoom from "../../../hooks/useCurrentRoom"
import { useRouter } from "next/navigation"
import useMessageHub from "../../../hooks/useMessageHub"
import Dropzone from 'shadcn-dropzone';
import axios from "axios"
import { Separator } from "../../ui/separator"
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { Avatar, AvatarImage } from "../../ui/avatar"

type Props = {
    rooms: IRoom[]
}


const ChatAddRoomDialog = () => {
    const [totalFriends, setTotalFriends] = useState<IMessageUser[]>([])
    const [selected, setSelected] = useState<IMessageUser[]>([])
    const [filtered, setFiltered] = useState<IMessageUser[]>([])
    const handleOpened = async () => {
        const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Friend/`);

        if (!resp.ok) {
            toast("Something wrong in getting friends")
        }

        const data = await resp.json();
        setTotalFriends(data)
        setFiltered(data)
        setSelected([])
    }

    const ref = useRef<HTMLInputElement>(null)

    const handleInputChanged = () => {
        if (!ref.current) {
            return
        }

        const value = ref.current.value.trim().toLowerCase()

        const excludedFilter = totalFriends.filter(f => !selected.includes(f));

        console.log(excludedFilter)
        if (value === "") {
            setFiltered(excludedFilter)
            return
        }

        const filteredUser = excludedFilter.filter(f => f.name.toLowerCase().includes(value))
        setFiltered(filteredUser)
    }

    const handleAddUser = (user: IMessageUser) => {
        selected.push(user)
        const remove = filtered.filter(f => f != user)

        setSelected([...selected])
        setFiltered(remove)
    }

    const handleRemoveUser = (user: IMessageUser) => {
        filtered.push(user)
        const remove = selected.filter(f => f != user)

        setSelected(remove)
        setFiltered([...filtered])
    }

    const handleCreateRoom = async () => {
        const otherUserId = selected.map(u => u.id)
        const name = `Room with ${selected.join(", ")}`
        const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Room`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                userIds: otherUserId
            })
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild onClick={handleOpened}>
                <Plus/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new Room</DialogTitle>
                    <DialogDescription>
                        Select which users you want to add. Click Create Room when you're done
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium leading-none">Selected Users</h4>
                        {selected.map(f => <div key={f.id} className="flex justify-between">
                            <div className="flex gap-2">
                                <Avatar>
                                    <AvatarImage src={`${api(ApiEndpoint.PROFILE)}/${f.picture}`} />
                                </Avatar>
                                <span>{f.name}</span>
                            </div>
                            <button onClick={() => handleRemoveUser(f)}>
                                <CiCircleMinus size={32} />
                            </button>
                        </div>)}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium leading-none">All Friends</h4>
                        <Input ref={ref} placeholder="Find friends" onChange={handleInputChanged} className="py-2"/>
                        {filtered.map(f => <div key={f.id} className="flex justify-between">
                            <div className="flex gap-2">
                                <Avatar>
                                    <AvatarImage src={`${api(ApiEndpoint.PROFILE)}/${f.picture}`} />
                                </Avatar>
                                <span>{f.name}</span>
                            </div>
                            <button onClick={()=>handleAddUser(f)}>
                                <CiCirclePlus size={32} />
                            </button>
                        </div>)}
                    </div>

                </div>

                <DialogFooter>
                    <Button type="submit" onClick={handleCreateRoom}>Create Room</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const LeaveRoomDialog = () => {
    const store = useLeaveRoomDialog()
    const roomStore = useRooms()
    const currentRoomStore = useCurrentRoom()
    const router = useRouter()

    const data = store.data

    const handleOnOpenChanged = (open: boolean) => {
        data.open = open
        store.set(data)
    }

    const handleConfirm = async () => {
        const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Room`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data.room?.id
            })
        })

        if (!resp.ok) {
            toast("Unexpected error had occured")
            return
        }

        roomStore.set(roomStore.rooms.filter(r => r != data.room))
        if (currentRoomStore.room == data.room) {
            router.push("/Chat")
        }

    }

    return (
        <AlertDialog open={data?.open} onOpenChange={handleOnOpenChanged}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely want to leave room {data.room?.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. You cannot make a chat in room {data.room?.name} again.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


const ModifyRoomDialog = () => {
    const store = useModifyRoomDialog()
    const roomStore = useRooms()

    const data = store.data

    const handleOnOpenChanged = (open: boolean) => {
        data.open = open
        store.set(data)
    }

    const handleConfirm = async () => {
        //const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Room`, {
        //    method: "DELETE",
        //    body: JSON.stringify({
        //        id: data.room?.id
        //    })
        //})

        //if (resp.ok) {
        //    roomStore.set(roomStore.rooms.filter(r => r != data.room))
        //}
    }

    return (
        <AlertDialog open={data?.open} onOpenChange={handleOnOpenChanged}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Modify room {data.room?.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Change users in room {data.room?.name }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


const CallNotifyDialog = () => {
    const store = useCallNotifyDialog()

    const data = store.data

    const handleOnOpenChanged = (open: boolean) => {
        data.open = open
        store.set(data)
    }

    const handleConfirm = async () => {
        window.open(`/CallSimple/${data.room?.id}`, '_blank');
    }

    return (
        <AlertDialog open={data?.open} onOpenChange={handleOnOpenChanged}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{data.room?.name} is calling</AlertDialogTitle>
                    <AlertDialogDescription>
                        Do you want to join?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="!justify-between pl-4 pr-4">
                    <AlertDialogCancel>Decline</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Answer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}



const RenameRoomDialog = () => {
    const store = useRenameRoomDialog()
    const roomStore = useRooms()

    const data = store.data

    const inputRef = useRef<HTMLInputElement>(null)

    const handleOnOpenChanged = (open: boolean) => {
        data.open = open
        store.set(data)
    }

    const handleConfirm = async () => {
        if (inputRef.current == null) {
            return
        }


        const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Room/${data.room?.id}`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(inputRef.current.value.trim())
        })

        if (!resp.ok) {
            toast("Unexpected error had occured")
        }
    }

    return (
        <AlertDialog open={data?.open} onOpenChange={handleOnOpenChanged}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Rename room {data.room?.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Change name of room {data.room?.name}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            New Name
                        </Label>
                        <Input ref={inputRef} id="name" placeholder="Input new name here" className="col-span-3" />
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Change</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


const ChangeProfileRoomDialog = () => {
    const store = useChangeProfileRoomDialog()
    const roomStore = useRooms()

    const data = store.data

    const inputRef = useRef<HTMLInputElement>(null)

    const handleOnOpenChanged = (open: boolean) => {
        data.open = open
        store.set(data)
    }

    const handleConfirm = async () => {
        if (inputRef.current == null) {
            return
        }


        const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Room/${data.room?.id}`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(inputRef.current.value.trim())
        })

        if (!resp.ok) {
            toast("Unexpected error had occured")
        }
    }

    return (
        <AlertDialog open={data?.open} onOpenChange={handleOnOpenChanged}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Change profile {data.room?.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Change image of a profile {data.room?.name}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                    <Dropzone onDrop={async (acceptedFile: File[]) => {
                        const form = new FormData();
                        form.append('file', acceptedFile[0]);
                        const resp = await axios.post(`${api(ApiEndpoint.MESSAGING)}/Room/Image/${data.room?.id}`, form, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            },
                        })

                        if (resp.status == 200) {
                            toast("Updated successfully")
                        }
                        else {
                            toast("Unexpected error had occured")
                        }
                        data.open = false
                        store.set(data)


                    }
                    } accept={{
                        'image/*': ['.jpeg', '.png']
                    }} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Change</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

const ChatSidebar = ({
    rooms
}: Props) => {

    const hub = useMessageHub()
    const callNotifyStore = useCallNotifyDialog()
    const totalRooms = useRooms();
    const currentRoomStore = useCurrentRoom()

    const handleRecieveCall = (data: IRoom) => {
        console.log("Calling in room ")
        console.log(data)

        const callData = callNotifyStore.data;
        callData.open = true
        callData.room = data
        callNotifyStore.set(callData)
    }

    const handleRecieveRoomNameChanged = (data: IRoom) => {
        const room = totalRooms.rooms.find(r => r.id == data.id)
        if (room == undefined) {
            console.log("Cannot find room")
            return
        }

        room.name = data.name

        if (currentRoomStore.room) {
            currentRoomStore.room.name = data.name
            currentRoomStore.set(currentRoomStore.room)
        } 


        totalRooms.set(totalRooms.rooms)
    }

    useEffect(() => {
        if (hub.hub == null) {
            return
        }
        const messageHub = hub.hub

        messageHub.on("RecieveCall", handleRecieveCall)
        messageHub.on("RecieveRoomNameChanged", handleRecieveRoomNameChanged)

        return () => {
            messageHub.off("RecieveCall", handleRecieveCall)
            messageHub.off("RecieveRoomNameChanged", handleRecieveRoomNameChanged)
        }
    }, [hub.hub, totalRooms, callNotifyStore, currentRoomStore])
    return (
        <>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Chat</SidebarGroupLabel>
                            <SidebarGroupAction>
                                <ChatAddRoomDialog />
                            </SidebarGroupAction>
                            <SidebarGroupContent></SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {rooms.map(r => <ChatSidebarItem key={r.id} room={r} />)}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>

            <LeaveRoomDialog />
            <ModifyRoomDialog />
            <RenameRoomDialog />
            <CallNotifyDialog />
        </>

    )
}

export default ChatSidebar