import express from 'express'
import { getViewByPath } from '../utils'
import { isStaging } from '../constants';

export const AppBrokedMiddleware = (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (isStaging) {
        console.log(error)
    }

    const isErrorCausedByApp = Boolean(error?.pugApplicationError)

    if (isErrorCausedByApp && error?.isRest) {
        return res.status(error?.statusCode).json({
            message: error?.restMessage
        })
    }

    if (isErrorCausedByApp) {
        req.flash('error', error?.pugApplicationError)
        res.status(400).render(getViewByPath(req))
    } else {
        res.locals.content = 'Houve um erro interno, tente novamente mais tarde.'
        res.status(500).render('error')
    }
};