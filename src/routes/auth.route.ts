import { Router } from "express";
import { AuthController } from "../controllers";

class Auth {
    public readonly router = Router()
    private readonly controller = AuthController

    constructor() {
        this.loadRoutes()
    }

    private loadRoutes(): void {
        this.router.post("/sigin", (req, res) => {
            return res.status(200).json({
                token: "hash"
            })
        })
        this.router.post("/signup", (req, res) => {
            const resController = this.controller.register(req.body)

            return res.status(resController.response.status)
                .json(resController.response.data)
        })
    }
}

const AuthRoute = new Auth()

export { AuthRoute }