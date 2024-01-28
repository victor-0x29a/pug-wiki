import { NextFunction, Request, Response } from "express";
import { Auth } from "../utils";

const ENDPOINT_REDIRECT = '/user/me'

const authUtil = new Auth()

export const UnableMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.session.authorization
    const hasToken = Boolean(token)
    if (!hasToken) {
        return next()
    }

    const isValidToken = authUtil.verifyToken(token!)

    if (!isValidToken) {
        authUtil.cleanAuthParams(req)
        return next()
    }

    return res.redirect(ENDPOINT_REDIRECT)
}