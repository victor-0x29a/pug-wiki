import express from 'express'
import path from 'path'

import { AppBrokedMiddleware, SassMiddleware } from './middlewares'
import { DefaultRoute, AuthRoute, ProtectedRoute } from './routes'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const { SESSION_SECRET } = process.env

class Server {
    public readonly app = express()

    constructor() {
        this.loadSettings()
        this.loadMiddlewares()
        this.loadRoutes()
        this.loadSecurityMiddlewares()
    }

    private readonly loadSettings = (): void => {
        this.app.use(cookieParser());
        this.app.use(session({
            secret: SESSION_SECRET!,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 3600000,
                sameSite: true
            }
        }));
        this.app.use(flash())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.set('view engine', 'pug')
        this.app.set('views', path.resolve(__dirname, 'views'))
    }

    private readonly loadRoutes = (): void => {
        this.app.use("/", DefaultRoute.router)
        this.app.use("/auth", AuthRoute.router)
        this.app.use("/user", ProtectedRoute.router)
    }

    private readonly loadMiddlewares = (): void => {
        this.app.use(SassMiddleware)
        this.app.use(express.static(path.resolve(__dirname, "public")))
    }

    private readonly loadSecurityMiddlewares = (): void => {
        this.app.use(AppBrokedMiddleware)
    }
}

const App = new Server()

export default App
