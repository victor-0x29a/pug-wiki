import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import App from "./core";
import { getStatusDebugger } from './utils';

App.app.listen(Number.parseInt(process.env.httpport!), () => {
    if (getStatusDebugger().isEnabledDebugger) {
        console.log('Server running')
    }
})