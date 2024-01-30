export const response = {
    redirect: function (path: string) {
        return path
    },
    status: function () {
        return {
            json: function () {
                return true
            }
        }
    },
}

export const request = (method: string) => {
    return {
        method,
        status: function () {
            return {
                json: function () {
                    return true
                }
            }
        },
        redirect: function (path: string) {
            return path
        }
    }
}