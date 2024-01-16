
import { UserService } from "../entities"
import express from 'express'

export const AuthController = {
    register: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return UserService.create(req?.body)
            .then(() => {
                req.flash('success', 'Usuário criado.')

                res.redirect('signup')
            })
            .catch(next)
    },
    registerPage: (req: express.Request, res: express.Response) => {
        res.render('signup')
    },
    loginPage: (req: express.Request, res: express.Response) => {
        res.render('signin')
    }
}