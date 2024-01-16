import { db } from '../../database'
import { ICategory } from '../dto/category.dto'

class Repository {
    async findAll(): Promise<ICategory[]> {
        try {
            const categories = await db.category.findMany() as ICategory[]

            return categories
        } catch (error) {
            throw error
        }
    }

    async delete(id: number): Promise<Partial<ICategory>> {
        try {
            return db.category.delete({
                where: { id }
            }) as Partial<ICategory>
        } catch (error) {
            throw error
        }
    }

    async create(data: ICategory) {
        try {
            return await db.category.create({
                data
            })
        } catch (error) {
            throw error
        }
    }
}

const CategoryRepository = new Repository

export { CategoryRepository }