import sass from 'node-sass-middleware'
import { isStaging } from '../constants'

export const SassMiddleware = sass({
    src: './src/',
    dest: './src/public',
    outputStyle: 'compressed',
    debug: isStaging
})
