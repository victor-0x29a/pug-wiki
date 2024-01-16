import { db } from '../../database'
import { ICategory } from '../dto/category.dto'

class Repository {
    async findAll(): Promise<ICategory[]> {
        const entities = await db.category.findMany() as ICategory[]

        return entities
    }

    async delete(id: number): Promise<ICategory | null> {
        const whereData = { id }

        return await db.category.delete({
            where: whereData
        }) as ICategory | null
    }

    async create(data: ICategory) {
        return await db.category.create({
            data
        })
    }
}