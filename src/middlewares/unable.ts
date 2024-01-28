import express from 'express'
import { NextFunction, Request, Response } from "express";
import { Auth } from "../utils";

const ENDPOINT_REDIRECT = '/user/me'

const authUtil = new Auth()

const resetAuthorization = (res: express.Response) => {
    return res.setHeader('authorization', "")
}

export const UnableMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    const hasToken = Boolean(token)
    if (!hasToken) {
        return next()
    }

    const isValidToken = authUtil.verifyToken(token!)

    if (!isValidToken) {
        resetAuthorization(res)
        return next()
    }

    return res.redirect(ENDPOINT_REDIRECT)
}