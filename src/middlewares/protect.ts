import express from 'express'
import { NextFunction, Request, Response } from "express";
import { Auth } from "../utils";

const LOGIN_ENDPOINT_REDIRECT = '/auth/signin'
const UNAUTHORIZED_ENDPOINT_REDIRECT = '/user/me'

const authUtil = new Auth()

export const ProtectMiddleware = (permissionLevelRequired: 1 | 2) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.session.authorization
    const hasToken = Boolean(token)
    if (!hasToken) {
        authUtil.cleanAuthParams(req)
        return res.redirect(LOGIN_ENDPOINT_REDIRECT)
    }

    const isValidToken = authUtil.verifyToken(token!)

    if (!isValidToken) {
        authUtil.cleanAuthParams(req)
        return res.redirect(LOGIN_ENDPOINT_REDIRECT)
    }

    const { permissionLevel } = authUtil.decodeToken(token!)

    if (permissionLevel < permissionLevelRequired) {
        return res.redirect(UNAUTHORIZED_ENDPOINT_REDIRECT)
    }

    next()
}