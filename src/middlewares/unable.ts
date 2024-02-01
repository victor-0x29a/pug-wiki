import { type NextFunction, type Request, type Response } from 'express'
import { Auth, ExpressUtils } from '../utils'

const ENDPOINT_REDIRECT = '/backoffice/me'

const authUtil = new Auth()

export const UnableMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.session.authorization as string | undefined | null
    const hasToken = Boolean(token)
    if (!hasToken) {
        next(); return
    }

    const isValidToken = authUtil.verifyToken(token as string)

    if (!isValidToken) {
        authUtil.cleanAuthParams(req)
        next(); return
    }

    new ExpressUtils(ENDPOINT_REDIRECT).Unauthorized(req, res)
}
