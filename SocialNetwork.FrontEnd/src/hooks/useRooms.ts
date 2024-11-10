import { IRoom } from "@/interfaces/IMessage";
import { create } from "zustand";

interface IRoomsStore {
    rooms: IRoom[],
    remove: () => void,
    set: (room: IRoom[]) => void
}

const useRooms = create<IRoomsStore>((set) => ({
    rooms: [],
    remove: () => {
        set({
            rooms: []
        })
    },
    set: (newHub) => set({
        rooms: [...newHub]
    })
}))

export default useRooms