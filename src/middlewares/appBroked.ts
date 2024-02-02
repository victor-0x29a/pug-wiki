import express from 'express'
import { getViewByPath } from '../utils'
import { isStaging } from '../constants'
import { AppError } from '../appError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppBrokedMiddleware = (error: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (isStaging) {
        console.log(error)
    }

    const isErrorCausedByApp = Boolean(error === AppError)

    if (isErrorCausedByApp) {
        const { pugApplicationError, isRest, statusCode, restMessage } = error as AppError

        if (isRest) return res.status(statusCode).json({
            message: restMessage
        })

        req.flash('error', pugApplicationError as string)
        res.status(400).render(getViewByPath(req))
    } else {
        res.locals.content = 'Houve um erro interno, tente novamente mais tarde.'
        res.status(500).render('error')
    }
}
