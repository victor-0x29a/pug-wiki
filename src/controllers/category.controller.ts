import { CategoryService } from "../entities/category";
import { ControllerResponse } from '../types/controllers'

export const CategoryController = {
    async getAll(): Promise<ControllerResponse> {
        try {
            const categories = CategoryService.findAll()

            return {
                error: false,
                response: {
                    data: categories,
                    status: 200
                }
            }
        } catch (error) {
            return {
                error: true,
                response: {
                    data: 'Houve um erro inesperado.',
                    status: 500
                }
            }
        }
    }
}