import { db } from '../../database'
import { User } from '../dto'

class Repository {
    async findAll(): Promise<User[]> {
        const entities = await db.user.findMany() as User[]

        return entities
    }

    async findOne(identification: string | number, type: 'id' | 'username'): Promise<User> {
        const isById = Boolean(type === 'id')
        const byIdentification = isById ? Number(identification) : String(identification)

        const whereData = {
            ...(isById && { id: byIdentification }),
            ...(!isById && { username: byIdentification })
        }

        console.log(whereData)

        const entity = await db.user.findFirst({
            where: whereData
        })

        return entity
    }

    async delete(identification: string | number, type: 'id' | 'username') {
        const isById = Boolean(type === 'id')
        const byIdentification = isById ? Number(identification) : String(identification)

        const whereData = {
            ...(isById && { id: byIdentification }),
            ...(!isById && { username: byIdentification })
        }

        const operation = await db.user.delete({
            where: whereData
        })

        return operation
    }
}


const UserRepository = new Repository

export { UserRepository }