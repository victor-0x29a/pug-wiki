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
            .catch(next)
    },
    async deleteOne(req: Request, res: Response, next: NextFunction) {
        return category.delete({
            slug: req?.params?.slug
        }).then(() => {
            return res.status(204).json()
        }).catch(next)
    },
    async createOne(req: Request, res: Response, next: NextFunction) {
        return category.create(req.body)
            .then(() => {
                return res.status(204).json()
            }).catch(next)
    }
}