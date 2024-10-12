export interface User {
    id?: number
    name: string
    username: string
    roles: string[]
    token?: string
    password?: string
}