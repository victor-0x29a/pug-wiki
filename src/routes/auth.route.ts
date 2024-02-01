import { Router } from "express";
import { AuthController } from "../controllers";
import { UnableMiddleware } from "../middlewares";

class Auth {
    public readonly router = Router()
    private readonly controller = AuthController

    constructor() {
        this.loadRoutes()
    }

    private loadRoutes(): void {
        this.router.get("/signin", UnableMiddleware, this.controller.showLogin)
        this.router.post("/signin", UnableMiddleware, this.controller.login)
        this.router.post("/signup", UnableMiddleware, this.controller.register)
        this.router.get("/signup", UnableMiddleware, this.controller.showRegister)
    }
}

const AuthRoute = new Auth()

export { AuthRoute }