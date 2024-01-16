import express from 'express'
import path from 'path'

import { SassMiddleware } from './middlewares'
import { DefaultRoute, AuthRoute } from './routes'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import cookieParser from 'cookie-parser'
import session from 'express-session'

class Server {
    public readonly app = express()

    constructor() {
        this.loadSettings()
        this.loadMiddlewares()
        this.loadRoutes()
    }

    private readonly loadSettings = (): void => {
        this.app.use(cookieParser());
        this.app.use(session({ secret: process.env.SESSION_SECRET! }));
        this.app.use(flash())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.set('view engine', 'pug')
        this.app.set('views', path.resolve(__dirname, 'views'))
    }

    private readonly loadRoutes = (): void => {
        this.app.use("/", DefaultRoute.router)
        this.app.use("/auth", AuthRoute.router)
    }

    private readonly loadMiddlewares = (): void => {
        this.app.use(SassMiddleware)
        this.app.use(express.static(path.resolve(__dirname, "public")))
    }
}

const App = new Server()

export default App
