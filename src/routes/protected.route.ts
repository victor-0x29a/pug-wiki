import { Router } from "express"
import { AppBrokedMiddleware, TemplateMiddleware } from "../middlewares"

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
        // TODO: Add the middleware to protect all routes
        this.router.use(AppBrokedMiddleware)
    }

    private loadRoutes(): void {
        this.router.get("/me", (req, res) => {
            res.render("me")
        })
    }
}

const ProtectedRoute = new Protected()

export { ProtectedRoute }