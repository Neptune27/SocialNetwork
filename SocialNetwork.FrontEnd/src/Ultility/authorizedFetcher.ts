const authorizedFetch = async (input: string | URL | globalThis.Request,
                               init?: RequestInit): Promise<Response> => {

    if (init === undefined) {
        init = {
            "method": "GET",
            "headers": {}
        }
    }


    if (init["headers"] === undefined) {
        init["headers"] = {}
    }

    // @ts-ignore
    init["headers"]["Authorization"] = "Bearer " + localStorage.getItem("token")

    return await fetch(input, init)
}


export { authorizedFetch }