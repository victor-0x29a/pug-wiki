import { AppError } from "../../appError";
import { ICategory } from "../dto/category.dto";
import { CategoryRepository } from "./repository";
import { parseCategory } from "./parser";
import { ICategorySchema } from "./serializer"

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
            return ICategorySchema.validate(data).then(async (parsedData) => {
                return await this.repository.create(parsedData)
            }).catch((error) => {
                throw new AppError(error.errors[0])
            })
        } catch (error) {
            throw error
        }
    }
}

export { Service as CategoryService }