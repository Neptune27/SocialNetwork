import { api, ApiEndpoint } from "../api/const"
import { authorizedFetch } from "../Ultility/authorizedFetcher"
import { IMessage } from "../interfaces/IMessage"

const useMessagesByRoom = async (id: string, fromDate?: number): Promise<IMessage[]> => {
    if (fromDate == undefined) {
        fromDate = Date.now()
    }

    const resp = await authorizedFetch(`${api(ApiEndpoint.MESSAGING)}/Message/ByRoom/${id}?date=${fromDate}`)
    const data = await resp.json()  
    return data

}

export default useMessagesByRoom