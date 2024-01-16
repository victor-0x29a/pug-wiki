import { IUser } from "../entities"
import { ControllerResponse } from "../types"
import { UserService } from "../entities"

export const AuthController = {
    register: async (user: IUser): Promise<ControllerResponse> => {
        try {
            const hasUserWithSameNick = await UserService.findByUsername(user.username)

            if (hasUserWithSameNick)
                return {
                    error: true,
                    response: {
                        data: 'Coloque outro nome de usuário.',
                        status: 409
                    }
                }

            await UserService.create(user)

            return {
                error: false,
                response: {
                    data: 'Usuário criado.',
                    status: 201
                }
            }
        } catch (e) {
            return {
                error: true,
                response: {
                    data: 'Houve um erro inesperado.',
                    status: 500
                }
            }
        }
    }
}