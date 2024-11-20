import { create } from "zustand";

interface UserProps {
    name: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
}

interface IUserStore {
    user: UserProps | null,
    remove: () => void,
    set: (user: UserProps) => void
}



const useCurrentUser = create<IUserStore>((set) => ({
    user: null,
    remove: () => {
        set({
            user: null
        })
    },
    set: (newUser) => set({
        user: { ...newUser }
    })
}))

export default useCurrentUser