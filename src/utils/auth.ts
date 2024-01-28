import jsonwebtoken from 'jsonwebtoken'
import express from 'express'
import { tokenDecoded } from '../types'

const { JWT_SECRET } = process.env

class Auth {
    generateToken(permissionLevel: number): string {
        return jsonwebtoken.sign({
            permissionLevel
        }, JWT_SECRET!)
    }
    verifyToken(token: string): boolean {
        try {
            const _decodedToken = jsonwebtoken.verify(token, JWT_SECRET!)
            return Boolean(_decodedToken)
        } catch (error) {
            return false
        }
    }
    decodeToken(token: string): tokenDecoded {
        const tokenDecoded = jsonwebtoken.decode(token) as tokenDecoded
        return {
            permissionLevel: tokenDecoded['permissionLevel']
        }
    }
    cleanAuthParams(request: express.Request) {
        request.session.username = ''
        request.session.authorization = ''
    }
}

export { Auth }