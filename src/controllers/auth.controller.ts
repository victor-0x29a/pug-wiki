import { UserService } from "../entities"
import express from 'express'
import { UserRepository } from "../entities/user/repository"

const user = new UserService(new UserRepository())

export const AuthController = {
    register: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { password, repeatedPassword, username } = req?.body

            return user.create({
                username,
                password,
                repeatedPassword,
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