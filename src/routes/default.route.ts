import { Router } from "express"
import { TemplateMiddleware } from "../middlewares"

class Default {
    public readonly router = Router()

    constructor() {
        this.loadMiddlewares()
        this.loadRoutes()
    }

    private loadMiddlewares(): void {
        this.router.use(TemplateMiddleware)
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
        this.router.get("/category", (req, res) => {
            res.locals.categories = [
                {
                    'label': 'Brazil',
                    'slug': 'brazil'
                },
                {
                    'label': 'Eletric',
                    'slug': 'eletric'
                },
                {
                    'label': 'Knowledge',
                    'slug': 'know-category'
                },
                {
                    'label': 'Cars',
                    'slug': 'cars'
                },
                {
                    'label': 'Danger',
                    'slug': 'danger-contents'
                }
            ]
            res.render("category")
        })
        this.router.get("/sigin", (req, res) => {
            res.render("sigin")
        })
    }
}

const DefaultRoute = new Default()

export { DefaultRoute }