import { type IUser } from '../dto'
import { type UserRepository } from './repository'
import { AppError } from '../../appError'
import { IUserSchema, IUserAuthSchema } from './serializer'
import { generateHash, compareHash, Auth } from '../../utils'
import { type authDataRequest, type AuthDataResponse } from '../../types'
import { ValidationError } from 'yup'

class Service {
    private readonly repository

    constructor (repository: UserRepository) {
        this.repository = repository
    }

    async find (username: string): Promise<IUser | null> {
        try {
            const entity = await this.repository.findOne(username)

            return entity
        } catch (error) {
            throw error
        }
    }

    async create (data: Partial<IUser>): Promise<IUser> {
        try {
            const dataParsed = await IUserSchema.validate(data)
            const hasUserWithSameNick = await this.find(dataParsed.username)

            if (hasUserWithSameNick !== null) {
                throw new AppError('Coloque outro nome de usuário.')
            }

            const passwordHashed = generateHash(dataParsed.password)

            const userCreated = await this.repository.create({
                username: dataParsed.username,
                password: passwordHashed,
                permission: 1,
                user_agent: dataParsed?.user_agent
            }) as IUser

            return userCreated
        } catch (error: unknown) {
            if (error === ValidationError) {
                const yupError = error as ValidationError
                throw new AppError(yupError.errors[0])
            } else {
                throw error
            }
        }
    }

    async createAuth (data: authDataRequest): Promise<AuthDataResponse> {
        try {
            const INVALID_DATA_MESSAGE = 'Confira se o nome de usuário ou senha são validos.'

            const { username, password } = await IUserAuthSchema.validate(data)

            const userData = await this.find(username)

            if (userData === null) {
                throw new AppError(INVALID_DATA_MESSAGE)
            }

            const isMatchPassword = await compareHash(userData.password, password)

            if (!isMatchPassword) {
                throw new AppError(INVALID_DATA_MESSAGE)
            }

            const authRepository = new Auth()

            return {
                token: authRepository.generateToken(userData.permission)
            }
        } catch (error: unknown) {
            if (error === ValidationError) {
                const yupError = error as ValidationError
                throw new AppError(yupError.errors[0])
            }
            throw error
        }
    }
}

export { Service as UserService }
