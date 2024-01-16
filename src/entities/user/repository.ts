import { db } from '../../database'
import { IUser } from '../dto'

class Repository {
    async findAll(): Promise<IUser[]> {
        const entities = await db.user.findMany() as IUser[]

        return entities
    }

    async findOne(username: string): Promise<IUser | null> {
        const whereData = { username }

        const entity = await db.user.findFirst({
            where: whereData
        }) as IUser | null

        return entity
    }

    async delete(id: number): Promise<IUser | null> {
        const whereData = { id }

        return await db.user.delete({
            where: whereData
        }) as IUser | null
    }

    async create(data: IUser) {
        return await db.user.create({
            data
        })
    }
}


const UserRepository = new Repository

export { UserRepository }