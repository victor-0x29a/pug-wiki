import { UserService } from "../entities"
import { Request, Response, NextFunction } from 'express'
import { UserRepository } from "../entities/user/repository"
import { SessionData } from 'express-session';
import { propertiesSession } from '../types/auth.util'

declare module 'express' {
    export interface Request {
        session: SessionData & propertiesSession
    }
}

const user = new UserService(new UserRepository())

export const AuthController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
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
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token } = await user.createAuth(req.body)
            req.flash('success', 'Bem-vindo(a)!')

            const { username } = req.body
            req.session.username = username
            req.session.authorization = token
            res.status(200).redirect('/backoffice/me')
        } catch (error) {
            next(error)
        }
    },
    registerPage: (req: Request, res: Response) => {
        res.render('signup')
    },
    loginPage: (req: Request, res: Response) => {
        res.render('signin')
    }
}