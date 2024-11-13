import { HubConnection } from "@microsoft/signalr";
import { create } from "zustand";

interface IMessageHubStore {
    hub: HubConnection | null;
    remove: () => void;
    set: (hub: HubConnection | null) => void;
}

const useMessageHub = create<IMessageHubStore>((set) => ({
    hub: null,
    remove: () => { set({
        hub: null
    }) },
    set: (newHub) => set({
        hub: newHub
    })
}))

export default useMessageHub