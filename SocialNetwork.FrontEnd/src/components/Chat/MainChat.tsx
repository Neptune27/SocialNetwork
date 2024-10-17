"use client"

import { IRoom } from "../../interfaces/IRoom"

const MainChat = (props: {
    rooms: IRoom[] | undefined
}) => {

    const { rooms } = props 

    return (
        <div>
            <button onClick={() => { console.log(rooms) }}>Click</button>
        </div>
    )
}

export default MainChat