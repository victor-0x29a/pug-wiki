import express from 'express'
import { CategoryService } from "../entities/category";
import { ICategory } from '../entities/dto/category.dto';

export const CategoryController = {
    async getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        return CategoryService.findAll()
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