import { ICategory } from "../dto/category.dto";
import { CategoryRepository } from "./repository";
import { serializeCategory } from "./serializer";

class Service {
    private readonly repository = CategoryRepository

    async findAll(): Promise<ICategory[]> {
        const categories = await this.repository.findAll()

        const categoriesParsed = categories.map(serializeCategory)

        return categoriesParsed
    }

    async create(data: ICategory): Promise<ICategory> {
        return await this.create(data)
    }
}

const CategoryService = new Service()

export { CategoryService }