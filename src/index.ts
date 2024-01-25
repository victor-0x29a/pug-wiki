import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import App from "./core";
import { getStatusDebugger } from './utils';

App.app.listen(Number.parseInt(process.env.httpport!), () => {
    if (getStatusDebugger().isEnabledDebugger) {
        const { httpport, appname } = process.env
        console.log(`http://localhost:${httpport} - ${appname} Listening`)
    }
})