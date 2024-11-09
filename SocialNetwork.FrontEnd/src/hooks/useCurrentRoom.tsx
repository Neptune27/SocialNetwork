import { IRoom } from "@/interfaces/IMessage";
import { create } from "zustand";

interface IRoomStore {
    room: IRoom | null,
    remove: () => void,
    set: (room: IRoom) => void
}

const useCurrentRoom = create<IRoomStore>((set) => ({
    room: null,
    remove: () => { set({
        room: null
    }) },
    set: (newHub) => set({
        room: {...newHub}
    })
}))

export default useCurrentRoom