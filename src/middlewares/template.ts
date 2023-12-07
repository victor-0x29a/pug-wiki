import { NextFunction, Request, Response } from "express";

export const TemplateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.locals.itemsNavBar = [
        {
            label: "Categorias",
            href: "/category"
        },
        {
            label: "Ajude a manter",
            href: "/help"
        }
    ]
    next()
}