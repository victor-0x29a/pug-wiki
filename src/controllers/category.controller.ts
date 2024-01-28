import { Request, Response, NextFunction } from 'express'
import { CategoryService } from "../entities/category";
import { ICategory } from '../entities/dto/category.dto';
import { CategoryRepository } from '../entities/category/repository';

const category = new CategoryService(new CategoryRepository())

export const CategoryController = {
    async getAll(req: Request, res: Response, next: NextFunction) {
        return category.findAll()
            .then((data: ICategory[]) => {
                return res.status(200).render('category', {
                    categories: data
                })
            })
            .catch((err) => {
                next(err)
            })
    },
    /* TODO: Route & page to create a category */
}