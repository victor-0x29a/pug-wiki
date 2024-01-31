// @ts-nocheck
import { ExpressUtils } from "../../utils";

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

test('should create an instance ExpressUtils with X path', () => {
    const ExpressUtilsInstance = new ExpressUtils('X')
    expect(ExpressUtilsInstance.PATH_REDIRECT).toBe('X')
})

test('should redirect when is get', () => {
    const PATH = 'X'
    const ExpressUtilsInstance = new ExpressUtils(PATH)
    expect(ExpressUtilsInstance.Unauthorized(request('GET'), response)).toEqual(PATH)
})

test('should redirect when method is get', () => {
    const PATH = 'X'
    const ExpressUtilsInstance = new ExpressUtils(PATH)
    expect(ExpressUtilsInstance.Unauthorized(request('GET'), response)).toEqual(PATH)
})

test('should not redirect when doesnt is a request with method get', () => {
    const PATH = 'X'
    const ExpressUtilsInstance = new ExpressUtils(PATH)
    expect(ExpressUtilsInstance.Unauthorized(request('POST'), response)).toEqual(true)
})