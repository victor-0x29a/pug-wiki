import sass from 'node-sass-middleware'

export const SassMiddleware = sass({
    src: "./src/",
    dest: "./src/public",
    outputStyle: 'compressed',
    debug: true
})