"use client"
import { useEffect, useState } from "react"

const MainChat = (props: {
    roomId: string
}) => {
    const {roomId} = props
    const [chat, setChat] = useState()
    useEffect(() => {
        console.log(roomId)
    }, [roomId])

    return (
        <div>
            
        </div> 
    )
}

export default MainChat