
import { AppError } from "../appError"
import { UserService } from "../entities"
import express from 'express'

export const AuthController = {
    register: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { password, passwordRepeated, username } = req?.body

            if (password !== passwordRepeated) {
                throw new AppError('Suas senhas não batem.')
            }

            return UserService.create({
                username,
                password,
                user_agent: req.headers["user-agent"]
            })
                .then(() => {
                    req.flash('success', 'Usuário criado.')

                    res.redirect('signup')
                })
                .catch(next)
        } catch (error) {
            next(error)
        }
    },
    registerPage: (req: express.Request, res: express.Response) => {
        res.render('signup')
    },
    loginPage: (req: express.Request, res: express.Response) => {
        res.render('signin')
    }
}