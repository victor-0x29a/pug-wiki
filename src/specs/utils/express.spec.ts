// @ts-nocheck
import { ExpressUtils } from "../../utils";

import { request, response } from './util.mock'

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