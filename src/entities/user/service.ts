import { IUser } from "../dto";
import { UserRepository } from "./repository";
import { AppError } from "../../appError";

class Service {
    private readonly repository = UserRepository

    async findByUsername(username: string): Promise<IUser | null> {
        try {
            const entity = await this.repository.findOne(username)

            return entity
        } catch (error) {
            throw error
        }
    }

    async create(data: Partial<IUser>): Promise<IUser> {
        try {
            const hasUserWithSameNick = await UserService.findByUsername(data.username!)

            if (hasUserWithSameNick) {
                throw new AppError('Coloque outro nome de usuário.')
            }

            const userCreated = await this.repository.create(data as IUser) as IUser

            return userCreated
        } catch (error) {
            throw error
        }
    }
}

const UserService = new Service()

export { UserService }