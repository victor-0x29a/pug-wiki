import { User } from "../entities"
import { ControllerResponse } from "../types"
import { UserService } from "../entities"

export const AuthController = {
    register: async (user: User): Promise<ControllerResponse> => {
        const hasUserWithSameNick = await UserService.findByUsername(user.username)

        console.log(hasUserWithSameNick)

        return {
            error: false,
            response: {
                data: `Welcome ${user.username}`,
                status: 200
            }
        }
    }
}