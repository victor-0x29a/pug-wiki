import { ICategory } from '../../entities/dto/category.dto'

interface createProps {
    data: ICategory
}

interface deleteProps {
    where: {
        id: any
    }
}

class Repository {
    categories: ICategory[] = []
    entity = {
        findMany: async () => {
            return Promise.resolve(await this.categories)
        },
        delete: async ({ where }: deleteProps) => {
            return Promise.resolve(this.categories = await this.categories.filter(category => category.id !== where.id))
        },
        create: async ({ data }: createProps) => {
            const payloadToCreate = {
                ...data, id: this.categories.length + 1
            }
            return Boolean(this.categories.push(payloadToCreate)) && payloadToCreate
        }
    }

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

export { Repository as CategoryRepository }
