export type IUser = {
    id?: number
    username: string
    password: string
    repeatedPassword?: string;
    user_agent: string
    permission: number
}