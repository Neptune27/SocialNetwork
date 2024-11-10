import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { api, ApiEndpoint } from "../api/const";

const useAuthorizeHub = (url: string) => {
    const connect = new HubConnectionBuilder()
        .withUrl(url, {
            accessTokenFactory: () => localStorage.getItem("token") as string
        })
        .configureLogging(LogLevel.Information)
        .build();

    connect.start()

    return connect
}

export default useAuthorizeHub