import { NextFunction, Request, Response } from "express";
import { itemsNavBar, itemsNavBarLogged } from "../constants";
import { Auth } from "../utils";

const authUtil = new Auth()

export const TemplateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    const hasToken = Boolean(token)
    if (!hasToken) {
        res.locals.itemsNavBar = itemsNavBar
        return next()
    }

    const isValidToken = authUtil.verifyToken(token!)

    if (!isValidToken) {
        res.locals.itemsNavBar = itemsNavBar
        return next()
    }

    res.locals.itemsNavBar = itemsNavBarLogged
    next()
}