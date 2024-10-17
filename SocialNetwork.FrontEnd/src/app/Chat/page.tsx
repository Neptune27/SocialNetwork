"use client"

import { useEffect, useState } from "react";
import { api, ApiEndpoint } from "../../api/const"
import MainChat from "../../components/Chat/MainChat";
import { authorizedFetch } from "../../helper/authorizedFetcher"
import { IRoom } from "../../interfaces/IRoom";

const Page = () => {
    const [rooms, setRooms] = useState<IRoom[]>();

    useEffect(() => {
        const getData = async () => {
            const rooms = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/room`)
            const roomsJson = await rooms.json();
            setRooms(roomsJson)
            console.log(roomsJson)
        }

        getData()
    }, [])

    
    return (
        <MainChat rooms={rooms} />
    )

}


export default Page