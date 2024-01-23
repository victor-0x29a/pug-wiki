import { category } from '../../database'
import { ICategory } from '../dto/category.dto'

class Repository {
    private readonly entity = category

    async findAll(): Promise<ICategory[]> {
        try {
            const categories = await this.entity.findMany() as ICategory[]

            return categories
        } catch (error) {
            throw error
        }
    }

    async delete(id: number): Promise<Partial<ICategory>> {
        try {
            return this.entity.delete({
                where: { id }
            }) as Partial<ICategory>
        } catch (error) {
            throw error
        }
    }

    async create(data: ICategory) {
        try {
            return await this.entity.create({
                data
            })
        } catch (error) {
            throw error
        }
    }
}

const CategoryRepository = new Repository

export { CategoryRepository }
