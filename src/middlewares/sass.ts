import sass from 'node-sass-middleware'
import { getStatusDebugger } from '../utils'

export const SassMiddleware = sass({
    src: "./src/",
    dest: "./src/public",
    outputStyle: 'compressed',
    debug: getStatusDebugger().isEnabledDebugger
})