import { user } from '../../database'
import { IUser } from '../dto'

class Repository {
    private readonly entity = user

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
            const whereData = { username }

            const entity = await this.entity.findFirst({
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

            return await this.entity.delete({
                where: whereData
            }) as IUser | null
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


const UserRepository = new Repository

export { UserRepository }