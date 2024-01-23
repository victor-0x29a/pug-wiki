import { NextFunction, Request, Response } from "express";

export const TemplateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.locals.itemsNavBar = [
        {
            label: "Categorias",
            href: "/category"
        },
        {
            label: "Ajude a manter",
            href: "/auth/help"
        },
        {
            label: "Entrar",
            href: "/auth/signin"
        }
    ]
    res.locals.dropdownItems = [
        {
            label: "Categorias",
            href: "/category"
        },
        {
            label: "Ajude a manter",
            href: "/auth/help"
        },
        {
            label: "Entrar",
            href: "/auth/signin"
        }
    ]
    next()
}