import { IUser } from '../../entities/dto'

interface deleteProps {
    where: {
        id: number
    }
}

interface createProps {
    data: IUser
}

interface findFirstProps {
    where: {
        username: string
    }
}

class Repository {
    users: IUser[] = []
    private readonly entity = {
        findMany: async () => {
            return (await this.users)
        },
        delete: async ({ where }: deleteProps) => {
            return (this.users = await this.users.filter(user => user.id !== where.id))
        },
        create: async ({ data }: createProps) => {
            const payloadToCreate = {
                ...data, id: this.users.length + 1
            }
            return Boolean(this.users.push(payloadToCreate)) && payloadToCreate
        },
        findFirst: async ({ where }: findFirstProps) => {
            const user = this.users.filter((user) => user.username === where.username)
            if (!user) {
                return null
            }
            return user
        }
    }

    async findAll(): Promise<IUser[]> {
        try {
            const entities = await this.entity.findMany() as IUser[]

            return entities
        } catch (error) {
            throw error
        }
    }

    async findOne(username: string): Promise<IUser | null> {
        try {
            const entity = await this.entity.findFirst({
                where: { username }
            }) as IUser | null

            return entity
        } catch (error) {
            throw error
        }
    }

    async delete(id: number) {
        try {
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
            return await this.entity.create({
                data
            })
        } catch (error) {
            throw error
        }
    }
}

export { Repository as UserRepository }