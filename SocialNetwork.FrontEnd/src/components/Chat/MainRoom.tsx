"use client"

import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { api, ApiEndpoint } from "../../api/const";
import { IRoom } from "../../interfaces/IRoom"
import { authorizedFetch } from "../../Ultility/authorizedFetcher";

const MainRoom = (props: {
    setRoomId : Dispatch<SetStateAction<string>>
}) => {


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
        <div>
            <button onClick={() => { console.log(rooms) }}>Click</button>
        </div>
    )
}

export default MainRoom