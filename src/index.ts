import { getStatusDebugger } from './utils';
import dotenv from 'dotenv'
import Core from "./core";

const isStaging = getStatusDebugger().isEnabledDebugger

const envFile = isStaging ? '.env.staging' : '.env.production'
dotenv.config({ path: `./${envFile}` })

const { HTTP_PORT, APP_NAME } = process.env

Core.app.listen(Number.parseInt(HTTP_PORT!), () => {
    if (getStatusDebugger().isEnabledDebugger) {
        console.log(`http://localhost:${HTTP_PORT} - ${APP_NAME} Listening`)
    }
})