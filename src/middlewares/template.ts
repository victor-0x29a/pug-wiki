import { type NextFunction, type Request, type Response } from 'express'
import { ADMIN_LEVEL, itemsNavBar, itemsNavBarAdmin, itemsNavBarLogged } from '../constants'
import { Auth } from '../utils'

const authInstance = new Auth()

export const TemplateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.session.authorization as string | undefined | null
  const hasToken = Boolean(token)
  if (!hasToken) {
    res.locals.itemsNavBar = itemsNavBar
    next(); return
  }

  const isValidToken = authInstance.verifyToken(token as string)

  if (!isValidToken) {
    res.locals.itemsNavBar = itemsNavBar
    next(); return
  }

  const { permissionLevel } = authInstance.decodeToken(token as string)
  const isAdmin = permissionLevel === ADMIN_LEVEL

  res.locals.itemsNavBar = isAdmin ? itemsNavBarAdmin : itemsNavBarLogged
  res.locals.profile = {
    username: req.session.username
  }
  next()
}
