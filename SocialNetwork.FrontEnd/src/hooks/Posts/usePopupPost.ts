import { create } from "zustand"
import { PostData } from "./usePosts"

type PopupPostDataType = {
    post?: PostData,
    open: boolean
}

interface IPopupPostStore {
    data: PopupPostDataType,
    set: (post: PopupPostDataType) => void,
}

const usePopupPost = create<IPopupPostStore>((set) => ({
    data: {
        open: false
    },
    set: (data) => set({
        data: { ...data }
    })
}))

export default usePopupPost