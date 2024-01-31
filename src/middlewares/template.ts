import { NextFunction, Request, Response } from "express";
import { ADMIN_LEVEL, itemsNavBar, itemsNavBarAdmin, itemsNavBarLogged } from "../constants";
import { Auth } from "../utils";

const authInstance = new Auth()

export const TemplateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.session.authorization
    const hasToken = Boolean(token)
    if (!hasToken) {
        res.locals.itemsNavBar = itemsNavBar
        return next()
    }

    const isValidToken = authInstance.verifyToken(token!)

    if (!isValidToken) {
        res.locals.itemsNavBar = itemsNavBar
        return next()
    }

    const { permissionLevel } = authInstance.decodeToken(token!)
    const isAdmin = permissionLevel === ADMIN_LEVEL

    res.locals.itemsNavBar = isAdmin ? itemsNavBarAdmin : itemsNavBarLogged
    res.locals.profile = {
        username: req.session.username
    }
    next()
}