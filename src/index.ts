import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import App from "./core";

App.app.listen(Number.parseInt(process.env.httpport!), () => {
    console.log('Server running')
})