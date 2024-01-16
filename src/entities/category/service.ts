import { AppError } from "../../appError";
import { ICategory } from "../dto/category.dto";
import { CategoryRepository } from "./repository";
import { serializeCategory } from "./serializer";

class Service {
    private readonly repository = CategoryRepository

    async findAll(): Promise<ICategory[]> {
        try {
            const categories = await this.repository.findAll()
            const categoriesParsed = categories.map(serializeCategory)

            return categoriesParsed
        } catch (error) {
            throw error
        }
    }

    async create(data: ICategory): Promise<ICategory> {
        try {
            return await this.create(data)
        } catch (error) {
            throw error
        }
    }
}

const CategoryService = new Service()

export { CategoryService }