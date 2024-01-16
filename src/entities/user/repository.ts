import { db } from '../../database'
import { IUser } from '../dto'

class Repository {
    async findAll(): Promise<IUser[]> {
        try {
            const entities = await db.user.findMany() as IUser[]

            return entities
        } catch (error) {
            throw error
        }
    }

    async findOne(username: string): Promise<IUser | null> {
        try {
            const whereData = { username }

            const entity = await db.user.findFirst({
                where: whereData
            }) as IUser | null

            return entity
        } catch (error) {
            throw error
        }
    }

    async delete(id: number): Promise<IUser | null> {
        try {
            const whereData = { id }

            return await db.user.delete({
                where: whereData
            }) as IUser | null
        } catch (error) {
            throw error
        }
    }

    async create(data: IUser) {
        try {
            return await db.user.create({
                data
            })
        } catch (error) {
            throw error
        }
    }
}


const UserRepository = new Repository

export { UserRepository }