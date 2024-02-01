export interface IUser {
  id?: number
  username: string
  password: string
  repeatedPassword?: string
  user_agent: string | null | undefined
  permission: number
}
