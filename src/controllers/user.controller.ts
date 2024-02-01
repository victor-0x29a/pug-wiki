import { Request, Response } from 'express'

export const UserController = {
    showMe: (req: Request, res: Response) => {
        res.render("me")
    }
}