import { NextFunction, Request, Response } from "express";
import { itemsNavBar } from "../constants";

export const TemplateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.locals.itemsNavBar = itemsNavBar
    next()
}