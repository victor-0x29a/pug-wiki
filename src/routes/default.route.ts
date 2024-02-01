import { Router } from "express"
import { AppBrokedMiddleware, TemplateMiddleware } from "../middlewares"
import { CategoryController, DefaultController } from '../controllers'

class Default {
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
        this.router.get("/", DefaultController.home)
        this.router.get("/help", DefaultController.help)
        this.router.get("/category", CategoryController.showAll)
    }
}

const DefaultRoute = new Default()

export { DefaultRoute }