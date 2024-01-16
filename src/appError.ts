class AppError {
    pugApplicationError: null | string = null
    constructor(error: string) {
        this.pugApplicationError = error
    }
}

export { AppError }