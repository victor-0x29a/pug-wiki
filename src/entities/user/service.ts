import { IUser } from "../dto";
import { UserRepository } from "./repository";
import { AppError } from "../../appError";
import { IUserSchema } from './serializer'
import { generateHash } from '../../utils'

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
            return IUserSchema.validate(data).then(async (dataParsed) => {
                const hasUserWithSameNick = await UserService.findByUsername(dataParsed.username!)

                if (hasUserWithSameNick) {
                    throw new AppError('Coloque outro nome de usuário.')
                }

                const passwordHashed = generateHash(dataParsed.password)

                const userCreated = await this.repository.create({
                    username: dataParsed.username,
                    password: passwordHashed,
                    permission: 1,
                    user_agent: dataParsed.user_agent!
                }) as IUser

                return userCreated
            }).catch((error) => {
                throw new AppError(error.errors[0])
            })
        } catch (error) {
            throw error
        }
    }
}

const UserService = new Service()

export { UserService }