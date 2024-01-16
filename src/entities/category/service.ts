import { ICategory } from "../dto/category.dto";
import { CategoryRepository } from "./repository";

class Service {
    private readonly repository = CategoryRepository

    async findAll(): Promise<ICategory[]> {
        return await this.repository.findAll()
    }

    async create(data: ICategory) {
        return await this.create(data)
    }
}

const CategoryService = new Service()

export { CategoryService }