import express from 'express'

export const AppBrokedMiddleware = (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const isErrorCausedByApp = Boolean(error?.pugApplicationError)
    if (isErrorCausedByApp) {
        req.flash('error', error.pugApplicationError)
        res.status(400).redirect(req.path)
    }
    res.locals.content = 'Houve um erro interno, tente novamente mais tarde.'
    res.render('error')
};