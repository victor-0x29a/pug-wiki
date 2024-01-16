import { Router } from "express"
import { TemplateMiddleware } from "../middlewares"
import { CategoryController } from '../controllers'

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
        this.router.get("/category", async (req, res) => {
            const fetchCategories = await CategoryController.getAll()
            if (!fetchCategories.error) {
                res.locals.categories = fetchCategories.response.data
            } else {
                req.flash("error", "Houve um erro ao listar as categorias.")
            }

            res.render("category")
        })
        this.router.get("/signin", (req, res) => {
            res.render("signin")
        })
        this.router.get("/signup", (req, res) => {
            res.render("signup")
        })
    }
}

const DefaultRoute = new Default()

export { DefaultRoute }