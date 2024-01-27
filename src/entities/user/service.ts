import { IUser } from "../dto";
import { UserRepository } from "./repository";
import { AppError } from "../../appError";
import { IUserSchema, IUserAuthSchema } from './serializer'
import { generateHash, compareHash, Auth } from '../../utils'
import { authDataRequest, AuthDataResponse } from '../../types'

class Service {
    private readonly repository

    constructor(repository: UserRepository) {
        this.repository = repository
    }

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
                const hasUserWithSameNick = await this.findByUsername(dataParsed.username!)

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

    async createAuth(data: authDataRequest): Promise<AuthDataResponse> {
        try {
            const VALID_DATA_MESSAGE = 'Confira se o nome de usuário ou senha são validos.'

            const { username, password } = await IUserAuthSchema.validate(data)

            const userData = await this.findByUsername(username)

            if (!userData) {
                throw new AppError(VALID_DATA_MESSAGE)
            }

            const isMatchPassword = compareHash(userData!.password, password)

            if (!isMatchPassword) {
                throw new AppError(VALID_DATA_MESSAGE)
            }

            const authRepository = new Auth()

            return {
                token: authRepository.generateToken(userData.permission)
            }
        } catch (error) {
            throw error
        }
    }
}

export { Service as UserService }