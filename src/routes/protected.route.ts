import { Router } from "express"
import { AppBrokedMiddleware, TemplateMiddleware } from "../middlewares"
import { ProtectMiddleware } from "../middlewares"
import { CategoryController, UserController } from "../controllers"

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
        this.router.get("/me", ProtectMiddleware(1), UserController.showMe)

        this.router.delete("/category/:slug", ProtectMiddleware(2), CategoryController.deleteOne)
        this.router.post("/category/", ProtectMiddleware(2), CategoryController.createOne)
    }
}

const ProtectedRoute = new Protected()

export { ProtectedRoute }