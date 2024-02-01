import { Auth } from "../../utils";

const authInstance = new Auth()

test('should generate a token with success', () => {
    expect(typeof authInstance.generateToken(1)).toBe('string')
})

test('should verify a token with success', () => {
    const token = authInstance.generateToken(1)
    expect(authInstance.verifyToken(token)).toBe(true)
})

test('should verify a token with fail', () => {
    const token = 'fake-token'
    expect(authInstance.verifyToken(token)).toBe(false)
})

test('should decode a token with success', () => {
    const PERMISSION_LEVEL = 1
    const token = authInstance.generateToken(PERMISSION_LEVEL)
    const { permissionLevel } = authInstance.decodeToken(token)
    expect(permissionLevel).toBe(PERMISSION_LEVEL)
})

test('should reset an auth params with success', () => {
    const AUTHORIZATION = "foo-bar"
    const USERNAME = "fooBar"
    const requestSimulated = {
        session: {
            authorization: AUTHORIZATION,
            username: USERNAME
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    authInstance.cleanAuthParams(requestSimulated)

    const { authorization, username } = requestSimulated.session
    expect(authorization).toBe("")
    expect(username).toBe("")
})