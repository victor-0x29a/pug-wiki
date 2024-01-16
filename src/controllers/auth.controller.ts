import { User } from "../entities"
import { ControllerResponse } from "../types"
import { UserService } from "../entities"

export const AuthController = {
    register: async (user: User): Promise<ControllerResponse> => {
        const hasUserWithSameNick = await UserService.findByUsername(user.username)

        if (hasUserWithSameNick)
            return {
                error: true,
                response: {
                    data: '01',
                    status: 409
                }
            }

        return {
            error: false,
            response: {
                data: `Welcome ${user.username}`,
                status: 200
            }
        }
    }
}