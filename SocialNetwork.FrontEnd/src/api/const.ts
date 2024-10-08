export const enum ApiEndpoint {
    IDENTITY = '/api/identity',
    MESSAGING = '/api/messaging',
    NOTIFICATION = '/api/notifications',
    POST = '/api/post',
    PROFILE = '/api/profile',

}



export const api = (endpoint: ApiEndpoint) => {
    return `${endpoint}`
}