import { AppError } from '../../appError'
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
    public hasDbConnection = true
    public categories: ICategory[] = []
    private entity = {
        findMany: async () => {
            return Promise.resolve(await this.categories)
        },
        delete: async ({ where }: deleteProps) => {
            const entityToDelete = this.categories.find(({ id }) => id === where.id)
            this.categories = await this.categories.filter(category => category.id !== where.id)
            return entityToDelete
        },
        create: async ({ data }: createProps) => {
            const payloadToCreate = {
                ...data, id: this.categories.length + 1
            }
            return Boolean(this.categories.push(payloadToCreate)) && payloadToCreate
        },
        find: async (slugToFind: string) => {
            return await this.categories.find(({ slug }) => slug === slugToFind)
        }
    }

    checkHasConnection = () => {
        if (!this.hasDbConnection) {
            throw new AppError('Db connection.')
        }
    }

    async findAll(): Promise<ICategory[]> {
        try {
            this.checkHasConnection()
            const categories = await this.entity.findMany() as ICategory[]

            return categories
        } catch (error) {
            throw error
        }
    }

    async delete(id: number) {
        try {
            this.checkHasConnection()
            return this.entity.delete({
                where: { id }
            }) as Partial<ICategory>
        } catch (error) {
            throw error
        }
    }

    async create(data: ICategory) {
        try {
            this.checkHasConnection()
            return await this.entity.create({
                data
            })
        } catch (error) {
            throw error
        }
    }

    async findBySlug(slug: string) {
        try {
            this.checkHasConnection()
            return await this.entity.find(slug)
        } catch (error) {
            throw error
        }
    }
}

export { Repository as CategoryRepository }
