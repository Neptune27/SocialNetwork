"use client"

import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble"
import { ChatMessageList } from "@/components/ui/chat/chat-message-list"
import useUserId from "@/hooks/useUserId"
import { IMessage } from "@/interfaces/IMessage"
import { forwardRef, MutableRefObject, useEffect, useRef } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import { api, ApiEndpoint } from "../../../api/const"
import { GoFileBinary } from "react-icons/go"

type Props = {
    messages: IMessage[],
    handleGetData: () => void,
    isInitalized: boolean
}

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
}

const ChatBody = ({ messages, handleGetData, isInitalized} : Props) => {
    const userId = useUserId()
    const itemRef = useRef(null)


    const handleObserver = (e: IntersectionObserverEntry[]) => {
        console.log(e)

        const entry = e[0]
        const observedTarget = entry.target;
        const isCurrentTarget = observedTarget == itemRef.current


        if (!isCurrentTarget || !isInitalized) {
            console.log("Unobserved")
            observer.unobserve(observedTarget)
            return
        }

        if (entry.isIntersecting) {
            handleGetData()
        }

    }

    const observer = new IntersectionObserver(handleObserver, options)

    useEffect(() => {
        if (itemRef.current) {
            observer.observe(itemRef.current)
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current)
            }
        }
    }, [itemRef.current, messages])

    return(
        <div id="mainChatBody" className="overflow-y-auto grow">
     
        <ChatMessageList id="mainChatList" className="flex-col-reverse">
                {messages.map((m, i) =>
                    i == messages.length - 1
                        ? <ChatContent m={m} userId={userId} key={`m${i}`} ref={ itemRef} />
                        : <ChatContent m={m} userId={userId} key={`m${i}`} />
                )}
         
            </ChatMessageList>

        </div>
    )
}

type ChatContentProps = {
    m: IMessage,
    userId: string | null,
}
const ChatContent = forwardRef<HTMLDivElement, ChatContentProps>(({ m, userId } : ChatContentProps, ref) => {
    return (
        <ChatBubble ref={ref} variant={m.user.id == userId ? "sent" : "received"} >
            <ChatBubbleAvatar src={m.user.picture} fallback='UD' />
            <ChatBubbleMessage variant={m.user.id == userId ? "sent" : "received"}>
                <ChatMessage m={m}/>
            </ChatBubbleMessage>
        </ChatBubble>

    )
})

type ChatMessageProps = {
    m: IMessage
}


const ChatMessage = ({ m }: ChatMessageProps) => {
    if (m.messageType == 0) {
        return (<>{m.content}</>)
    }

    if (m.content.endsWith("webp")) {
        return (<img src={`${api(ApiEndpoint.MESSAGING)}/${m.content}`} />)
    }


    const urlChunks = m.content.split(/[\/\\]/g)

    return (<a href={`${api(ApiEndpoint.MESSAGING)}/${m.content}`}>
        <div className="w-40 truncate flex flex-col justify-between">
            <div className="flex justify-center">
                <GoFileBinary size={125} />
            </div>
            <span className="">{urlChunks[urlChunks.length-1]}</span>
        </div>
        </a>)
}

export default ChatBody