import { create } from "zustand"
import { IRoom } from "../../../interfaces/IMessage"
import { bool } from "yup"


type LeaveDataType = {
    room?: IRoom,
    open: boolean
}

interface IRoomDialogStore {
    data: LeaveDataType
    set: (room: LeaveDataType) => void,
}

const useLeaveRoomDialog = create<IRoomDialogStore>((set) => ({
    data: {
        open: false
    },
    set: (data) => set({
        data: { ...data }
    })
}))

const useModifyRoomDialog = create<IRoomDialogStore>((set) => ({
    data: {
        open: false
    },
    set: (data) => set({
        data: { ...data }
    })
}))

const useRenameRoomDialog = create<IRoomDialogStore>((set) => ({
    data: {
        open: false
    },
    set: (data) => set({
        data: { ...data }
    })
}))

const useChangeProfileRoomDialog = create<IRoomDialogStore>((set) => ({
    data: {
        open: false
    },
    set: (data) => set({
        data: { ...data }
    })
}))

const useCallNotifyDialog = create<IRoomDialogStore>((set) => ({
    data: {
        open: false
    },
    set: (data) => set({
        data: { ...data }
    })
}))

export { useLeaveRoomDialog, useModifyRoomDialog, useRenameRoomDialog, useCallNotifyDialog, useChangeProfileRoomDialog }

