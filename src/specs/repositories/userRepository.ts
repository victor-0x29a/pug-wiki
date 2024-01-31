import { AppError } from '../../appError'
import { IUser } from '../../entities/dto'

interface deleteProps {
    where: {
        id?: number
        username?: string
    }
}

interface createProps {
    data: IUser
}

interface findFirstProps {
    where: {
        id?: number
        username?: string
    }
}

class Repository {
    public hasDbConnection = true
    public users: IUser[] = []
    private readonly entity = {
        findMany: async () => {
            return (await this.users)
        },
        delete: async ({ where }: deleteProps) => {
            const userDeleted = this.users.find(({ id }) => id === where.id)
            if (!userDeleted) {
                return null
            }
            this.users = this.users.filter(user => user.id !== where.id)
            return userDeleted

        },
        create: async ({ data }: createProps) => {
            const payloadToCreate = {
                ...data, id: this.users.length + 1
            }
            return Boolean(this.users.push(payloadToCreate)) && payloadToCreate
        },
        findFirst: async ({ where }: findFirstProps) => {
            let data = null as IUser | null
            if (where.id) {
                data = this.users.filter(({ id }) => id === where?.id)[0]
            } else {
                data = this.users.filter(({ username }) => username === where.username)[0]
            }
            if (!data) return null
            return data
        }
    }

    checkHasConnection = () => {
        if (!this.hasDbConnection) {
            throw new AppError('Db connection.')
        }
    }

    async findAll(): Promise<IUser[]> {
        try {
            this.checkHasConnection()
            const entities = await this.entity.findMany() as IUser[]

            return entities
        } catch (error) {
            throw error
        }
    }

    async findOne(username: string): Promise<IUser | null> {
        try {
            this.checkHasConnection()
            const entity = await this.entity.findFirst({
                where: { username }
            }) as IUser | null

            return entity
        } catch (error) {
            throw error
        }
    }

    async delete(id: number): Promise<IUser | null> {
        try {
            this.checkHasConnection()
            const whereData = { id }

            return await this.entity.delete({
                where: whereData
            })
        } catch (error) {
            throw error
        }
    }

    async create(data: IUser) {
        try {
            this.checkHasConnection()
            return await this.entity.create({
                data
            })
        } catch (error) {
            throw error
        }
    }
}

export { Repository as UserRepository }