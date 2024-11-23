import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { api, ApiEndpoint } from "../api/const";
import useToken from "./useToken";

const useAuthorizeHub = (url: string) => {
    const token = useToken()
    const connect = new HubConnectionBuilder()
        .withUrl(url, {
            accessTokenFactory: () => token as string
        })
        .configureLogging(LogLevel.Information)
        .build();

    connect.start()

    return connect
}

export default useAuthorizeHub