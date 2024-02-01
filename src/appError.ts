class AppError extends Error {
    public pugApplicationError: null | string = null
    public isRest = false
    public restMessage = ''
    public statusCode = 400

    constructor(error: string, isRest = false, restMessage = '', statusCode = 400) {
        super(error)
        this.pugApplicationError = error
        this.isRest = isRest
        this.restMessage = restMessage
        this.statusCode = statusCode
    }
}

export { AppError }