"use client"

import ChatBody from "@/components/Chat/Chat/ChatBody"
import ChatFooter from "@/components/Chat/Chat/ChatFooter"
import ChatHeader from "@/components/Chat/Chat/ChatHeader"
import useCurrentRoom from "@/hooks/useCurrentRoom"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useRef, useCallback } from "react"
import useRooms from "../../../hooks/useRooms"
import { api, ApiEndpoint } from "../../../api/const"
import { authorizedFetch } from "../../../helper/authorizedFetcher"
import useMessagesByRoom from "../../../hooks/useMessagesByRoom"
import useMessageHub from "../../../hooks/useMessageHub"
import { ERoomType, IMessage } from "../../../interfaces/IMessage"
import setDebounce from "../../../helper/debounce"
import { toast } from "sonner"
import useUserId from "../../../hooks/useUserId"

const ChatRoom = () => {
    const params = useParams()
    const id = params.id

    const rooms = useRooms()
    const currentRoom = useCurrentRoom()
    const router = useRouter()


    const currentRoomRef = useRef(currentRoom)
    const roomsRef = useRef(rooms)
    const [init, setInit] = useState(false)

    const hub = useMessageHub()
    // const [room, setRoom] =

    const handleNewMessage = (data: IMessage) => {
        console.log("Current ID: " + id)
        console.log(data)

        if (data.room.id != id) {
            console.log(`Room: ${data.room.id}, id: ${id}`)
            const otherRoom = rooms.rooms.find(r => r.id == data.room.id)
            toast(data.room.name, {
                description: `${data.user.name}: ${data.messageType == 0 ? data.content : 'Media'}`,
                action: {
                    label: "Go to Room",
                    onClick: () => router.push(`/Chat/${data.room.id}`)
                }
            })

            if (otherRoom == undefined) {
                console.log("Undefined")
                //Handle undefined
                return
            }
            console.log("Hello")

            otherRoom.messages.push(data)
            rooms.set(rooms.rooms)

            return
        }

        if (currentRoom.room == null) {
            console.log(rooms.rooms)
            console.error("Room null???")
            return
        }


        console.log("Update Room")
        currentRoom.room.messages.unshift(data)
        currentRoom.set({ ...currentRoom.room })



    }

    useEffect(() => {
        if (hub.hub == null) {
            return
        }
        const messageHub = hub.hub
        
        messageHub.on("RecieveMessage", handleNewMessage)
        
        return () => {
            messageHub.off("RecieveMessage", handleNewMessage)
        }
    }, [hub.hub, rooms, currentRoom])


    //Get latest X messages
    useEffect(() => {
        if (currentRoom.room == null) {
            return
        }

        if (currentRoom.room.id != id) {
            return
        }

        if (init) {
            return
        }

        const getMessages = async () => {

            if (currentRoom.room == null) {
                return
            }

            const messages = await useMessagesByRoom(id)
            const r = rooms.rooms.find(r => r.id == id)
            if (r == null) {
                return
            }



            if (messages.length == 0) {
                return
            }

            if (r.messages.length == 0) {
                r.messages = messages

                rooms.set(rooms.rooms)
                currentRoom.set(r)

                return
            }

            if (new Date(r.messages[0].createdAt) < new Date(messages[0].createdAt)) {
                r.messages = messages

                rooms.set(rooms.rooms)
                currentRoom.set(r)

                return
            }

            currentRoom.set(r)



            setInit(true)
        }

        getMessages()


    }, [currentRoom, rooms])

    const [isLastMessage, setIsLastMessage] = useState(false)


    //Get room details
    useEffect(() => {
        if (currentRoom.room !== null && currentRoom.room.id == id) {
            return
        }

        if (rooms.rooms.length == 0) {
            return
        }

        const setRoom = async () => {

            const newRoom = rooms.rooms.find(r => r.id == id)


            if (newRoom == undefined) {
                console.log("Room not found")
                const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Room/${id}`)
                const data = await resp.json()
                console.log("Data")
                console.log(data);
                console.log(rooms.rooms);

                rooms.set([...rooms.rooms, data])
                return
            }
            console.log("Set room")
            currentRoom.set(newRoom)
        }


        setRoom()
        //Fetch room and set current
        // currentRoom.set(null)
    }, [rooms, currentRoom])

    const getDataDebounced =
        setDebounce(async () => {
            if (currentRoom.room == null) {
                return
            }

            const length = currentRoom.room.messages.length
            const lastMessage = currentRoom.room.messages[length - 1]
            const unixDate = new Date(lastMessage.createdAt)
            const val = unixDate.valueOf()


            if (isLastMessage) {
                return
            }

            const newMessage = await useMessagesByRoom(id, val)

            if (newMessage.length == 0) {
                setIsLastMessage(true)
            }

            const r = rooms.rooms.find(r => r.id == id)

            if (r == null) {
                return 
            }

            r.messages = [...r.messages, ...newMessage]

            currentRoom.set(r)
        }, 100)


    const userId = useUserId();

    const handleGetData = async () => {
        getDataDebounced()
    }


    if (currentRoom.room == null) {
        return (
            <div>Loading</div>
        )
    }

    let roomName = currentRoom.room.name
    switch (currentRoom.room.roomType) {
        case ERoomType.Normal:
            const otherUser = currentRoom.room.users.find(u => u.id != userId)

            if (otherUser !== undefined) {
                roomName = otherUser.name
            }
            break
        case ERoomType.Group:
            break;

        default:
            break;
    }
    return (
        <>
            <ChatHeader name={roomName} profile={currentRoom.room.profile} total={currentRoom.room.users.length} />
            <ChatBody messages={currentRoom.room.messages} handleGetData={handleGetData} isInitalized={init} />
            <ChatFooter />
        </>
    )
}

export default ChatRoom


