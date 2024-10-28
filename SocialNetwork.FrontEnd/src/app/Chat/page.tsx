"use client"

import { useEffect, useState } from "react";
import { api, ApiEndpoint } from "../../api/const"
import MainRoom from "../../components/Chat/MainRoom";
import { authorizedFetch } from "../../helper/authorizedFetcher"
import { IRoom } from "../../interfaces/IMessage";
import MainChat from "../../components/Chat/MainChat";

const Page = () => {
    
    const [roomId, setRoomId] = useState("")
    
    return (
        <div className="d-flex">
            <MainRoom setRoomId={ setRoomId} />
            <MainChat roomId={roomId} />
        </div>
        

    )

}


export default Page