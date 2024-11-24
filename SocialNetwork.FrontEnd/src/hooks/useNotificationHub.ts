import { HubConnection } from "@microsoft/signalr";
import { create } from "zustand";

interface IHubStore {
    hub: HubConnection | null;
    set: (hub: HubConnection | null) => void;
}

const useNotificationHub = create<IHubStore>((set) => ({
    hub: null,
    set: (newHub) => set({
        hub: newHub
    })
}))

export default useNotificationHub