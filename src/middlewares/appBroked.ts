import express from 'express'
import { getViewByPath } from '../utils'

export const AppBrokedMiddleware = (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const isErrorCausedByApp = Boolean(error?.pugApplicationError)
    if (isErrorCausedByApp) {
        req.flash('error', error.pugApplicationError)
        res.status(400).render(getViewByPath(req))
    } else {
        res.locals.content = 'Houve um erro interno, tente novamente mais tarde.'
        res.status(500).render('error')
    }
};