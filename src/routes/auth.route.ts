import { Router } from "express";
import { AuthController } from "../controllers";

class Auth {
    public readonly router = Router()
    private readonly controller = AuthController

    constructor() {
        this.loadRoutes()
    }

    private loadRoutes(): void {
        this.router.post("/signin", (req, res) => {
            return res.status(200).json({
                token: "hash"
            })
        })
        this.router.post("/signup", async (req, res) => {
            const resController = await this.controller.register(req.body)

            const ENDPOINT_TO_REDIRECT = '/signup'

            if (!resController.error) {
                req.flash('success', 'Conta criada.');
                return res.redirect(ENDPOINT_TO_REDIRECT)
            }

            req.flash('error', resController.response.data)
            res.redirect(ENDPOINT_TO_REDIRECT)
        })
    }
}

const AuthRoute = new Auth()

export { AuthRoute }