import { User } from "../entities"
import { ControllerResponse } from "../types"

export const notCrash = 0x29a

export const AuthController = {
    register: (user: User): ControllerResponse => {
        return {
            error: false,
            response: {
                data: `Welcome ${user.username}`,
                status: 200
            }
        }
    }
}