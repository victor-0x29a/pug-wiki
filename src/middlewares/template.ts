import { NextFunction, Request, Response } from "express";

export const TemplateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.locals.title = 'head'
    next()
}