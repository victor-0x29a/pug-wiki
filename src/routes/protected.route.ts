import { Router } from "express"
import { AppBrokedMiddleware, TemplateMiddleware } from "../middlewares"
import { ProtectMiddleware } from "../middlewares"

class Protected {
    public readonly router = Router()

    constructor() {
        this.loadMiddlewares()
        this.loadRoutes()
        this.loadSecurityMiddlewares()
    }

    private loadMiddlewares(): void {
        this.router.use(TemplateMiddleware)
    }

    private readonly loadSecurityMiddlewares = (): void => {
        this.router.use(AppBrokedMiddleware)
    }

    private loadRoutes(): void {
        this.router.get("/me", ProtectMiddleware(1), (req, res) => {
            res.render("me")
        })
    }
}

const ProtectedRoute = new Protected()

export { ProtectedRoute }