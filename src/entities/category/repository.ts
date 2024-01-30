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

    async delete(id: number) {
        try {
            return this.entity.delete({
                where: { id }
            }) as Partial<ICategory>
        } catch (error) {
            throw error
        }
    }

    async create(data: ICategory): Promise<ICategory> {
        try {
            return await this.entity.create({
                data
            })
        } catch (error) {
            throw error
        }
    }

    async findBySlug(slug: string): Promise<ICategory | null> {
        try {
            return await this.entity.findFirst({
                where: {
                    slug
                }
            })
        } catch (error) {
            throw error
        }
    }
}

export { Repository as CategoryRepository }
