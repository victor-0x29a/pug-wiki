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
        this.router.post("/signup", this.controller.register)
    }
}

const AuthRoute = new Auth()

export { AuthRoute }