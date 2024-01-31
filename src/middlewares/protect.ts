import { NextFunction, Request, Response } from "express";
import { Auth, ExpressUtils } from "../utils";
import { isStaging } from "../constants";

const LOGIN_ENDPOINT_REDIRECT = '/auth/signin'
const UNAUTHORIZED_ENDPOINT_REDIRECT = '/backoffice/me'

const authInstance = new Auth()

export const ProtectMiddleware = (permissionLevelRequired: 1 | 2) => (req: Request, res: Response, next: NextFunction) => {
    if (isStaging) next()

    const token = req.session.authorization
    const hasToken = Boolean(token)
    if (!hasToken) {
        authInstance.cleanAuthParams(req)
        return new ExpressUtils(LOGIN_ENDPOINT_REDIRECT).Unauthorized(req, res)
    }

    const isValidToken = authInstance.verifyToken(token!)

    if (!isValidToken) {
        authInstance.cleanAuthParams(req)
        return new ExpressUtils(LOGIN_ENDPOINT_REDIRECT).Unauthorized(req, res)
    }

    const { permissionLevel } = authInstance.decodeToken(token!)

    if (permissionLevel < permissionLevelRequired) {
        return new ExpressUtils(UNAUTHORIZED_ENDPOINT_REDIRECT).Unauthorized(req, res)
    }

    next()
}