import { Router } from "express"
import { AppBrokedMiddleware, TemplateMiddleware } from "../middlewares"
import { AuthController, CategoryController } from '../controllers'

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
        this.router.get("/", (req, res) => {
            res.render("index")
        })
        this.router.get("/help", (req, res) => {
            res.render("help", {
                walletbtc: process.env.walletbtc
            })
        })
        this.router.get("/category", CategoryController.getAll)
        this.router.get("/signin", AuthController.loginPage)
        this.router.get("/signup", AuthController.registerPage)
    }
}

const DefaultRoute = new Default()

export { DefaultRoute }