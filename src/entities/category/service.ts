import { AppError } from "../../appError";
import { ICategory } from "../dto/category.dto";
import { CategoryRepository } from "./repository";
import { parseCategory } from "./parser";
import { ICategorySchema } from "./serializer"
import yup from 'yup'

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

            return await this.repository.create(schemaValidation)
        } catch (error: any) {
            if (error?.name === 'ValidationError') {
                throw new AppError(error.errors[0])
            } else {
                throw error
            }
        }
    }
}

export { Service as CategoryService }