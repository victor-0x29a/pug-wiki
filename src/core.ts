import express from 'express'
import path from 'path'

import { SassMiddleware } from './middlewares'
import { DefaultRoute } from './routes'

class Server {
    public readonly app = express()

    constructor() {
        this.loadSettings()
        this.loadMiddlewares()
        this.loadRoutes()
    }

    private readonly loadSettings = (): void => {
        this.app.set('view engine', 'pug')
        this.app.set('views', path.resolve(__dirname, 'views'))
    }

    private readonly loadRoutes = (): void => {
        this.app.use("/", DefaultRoute.router)
    }

    private readonly loadMiddlewares = (): void => {
        this.app.use(SassMiddleware)
        this.app.use(express.static(path.resolve(__dirname, "public")))
    }
}

const App = new Server()

export default App
