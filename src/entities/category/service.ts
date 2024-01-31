import { AppError } from "../../appError";
import { ICategory, ICategoryFind } from "../dto/category.dto";
import { CategoryRepository } from "./repository";
import { parseCategory } from "./parser";
import { ICategoryFindSchema, ICategorySchema } from "./serializer"

class Service {
    private readonly repository;
    constructor(repository: CategoryRepository) {
        this.repository = repository
    }

    async findAll(): Promise<ICategory[]> {
        try {
            const categories = await this.repository.findAll()
            const categoriesParsed = categories.map(parseCategory)

            return categoriesParsed
        } catch (error) {
            throw error
        }
    }

    async create(data: ICategory): Promise<ICategory> {
        try {
            const schemaValidation = await ICategorySchema.validate(data)

            const hasCategoryWithSameSlug = await this.repository.findBySlug(schemaValidation.slug)

            if (hasCategoryWithSameSlug) {
                throw new AppError('Já existe uma categoria com o mesmo slug.', true, 'Já existe uma categoria com o mesmo slug.', 409)
            }

            return await this.repository.create(schemaValidation)
        } catch (error: any) {
            if (error?.name === 'ValidationError') {
                throw new AppError(error.errors[0], true, error.errors[0], 422)
            } else {
                throw error
            }
        }
    }

    async delete(data: Partial<ICategoryFind>): Promise<ICategoryFind> {
        try {
            const { slug } = await ICategoryFindSchema.validate(data)
            const category = await this.repository.findBySlug(slug)

            if (!category) {
                throw new AppError('Categoria inexistente.', true, 'Categoria inexistente.', 404)
            }

            const { id } = category

            return this.repository.delete(id!) as Promise<ICategoryFind>
        } catch (error: any) {
            if (error?.name === 'ValidationError') {
                throw new AppError(error.errors[0], true, error.errors[0], 422)
            } else {
                throw error
            }
        }
    }
}

export { Service as CategoryService }