import express from 'express'

class Server {
    public readonly app = express()

    constructor() {
        this.loadSettings()
        this.loadRoutes()
    }

    private readonly loadSettings = (): void => {
        this.app.set('view engine', 'pug')
        this.app.set('views', './src/views')
    }

    private readonly loadRoutes = (): void => {
        this.app.get("/", (req, res) => {
            res.render("index")
        })
    }
}

const App = new Server()

export default App
