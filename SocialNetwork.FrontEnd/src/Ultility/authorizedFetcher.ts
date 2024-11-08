const authorizedFetch = async (input: string | URL | globalThis.Request,
    init?: RequestInit, redirectOnUnathorized = () => { window.location.href = "/Login" }): Promise<Response> => {

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

    const result = await fetch(input, init)

    if (result.status == 401) {
        console.log("Unauthorize, redirecting")
        redirectOnUnathorized();
    }

    return result
}


export { authorizedFetch }