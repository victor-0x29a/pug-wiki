import { Response, Request } from 'express'

class ExpressUtils {
    public PATH_REDIRECT = ''
    constructor(pathRedirect: string) {
        this.PATH_REDIRECT = pathRedirect
    }

    Unauthorized(request: Request, response: Response) {
        if (request.method === 'GET') {
            return response.redirect(this.PATH_REDIRECT)
        } else {
            return response.status(401).json()
        }
    }
}

export { ExpressUtils }