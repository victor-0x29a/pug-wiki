import { Request, Response } from 'express'

export const UserController = {
    me: (req: Request, res: Response) => {
        res.render("me")
    }
}