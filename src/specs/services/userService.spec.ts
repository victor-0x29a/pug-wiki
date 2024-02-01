/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { AppError } from '../../appError';
import { UserService } from '../../entities/user'
import { UserRepository } from "../repositories/userRepository";

const userPayload = {
    username: "foo-bar",
    password: "password123",
    repeatedPassword: "password123"
}

test('should create an user', async () => {
    const repositoryInstance = new UserRepository()
    const serviceInstance = new UserService(repositoryInstance)

    const createRequest = await serviceInstance.create(userPayload)
    expect(createRequest.user_agent).toEqual(undefined)
    expect(createRequest.username).toEqual(userPayload.username)
    expect(createRequest.password).not.toEqual(userPayload.password)
})

test('should does not create an user with invalid data', async () => {
    const repositoryInstance = new UserRepository()
    const serviceInstance = new UserService(repositoryInstance)

    const changedPayload = {
        ...userPayload,
        password: 'pass'
    }

    const errorExpected = new AppError("As senhas não coincidem.")

    await expect(async () => await serviceInstance.create(changedPayload)).rejects.toEqual(errorExpected)
})

test('should create an user and realize the login', async () => {
    const repositoryInstance = new UserRepository()
    const serviceInstance = new UserService(repositoryInstance)

    const { username, password } = userPayload

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _createRequest = await serviceInstance.create(userPayload)
    const loginRequest = await serviceInstance.createAuth({
        username,
        password
    })
    expect(typeof loginRequest.token).toEqual('string')
})

test('should does not create a user with username belonging to another user', async () => {
    const repositoryInstance = new UserRepository()
    const serviceInstance = new UserService(repositoryInstance)

    const _firstCreateRequest = await serviceInstance.create(userPayload)
    expect(_firstCreateRequest.user_agent).toEqual(undefined)
    expect(_firstCreateRequest.username).toEqual(userPayload.username)
    expect(_firstCreateRequest.password).not.toEqual(userPayload.password)

    const errorExpected = new AppError("Coloque outro nome de usuário.")

    await expect(async () => await serviceInstance.create(userPayload)).rejects.toEqual(errorExpected)
})

test('should create an user with data invalid', async () => {
    const repositoryInstance = new UserRepository()
    const serviceInstance = new UserService(repositoryInstance)

    const invalidData = {
        username: '',
        password: userPayload.password
    }

    const errorExpected = new AppError("A senha de confirmação é obrigatória.")

    await expect(async () => await serviceInstance.create(invalidData)).rejects.toEqual(errorExpected)
})

test('should create an user without db connection', async () => {
    const repositoryInstance = new UserRepository()
    const serviceInstance = new UserService(repositoryInstance)
    repositoryInstance.hasDbConnection = false

    const errorExpected = new AppError("Db connection.")

    await expect(async () => await serviceInstance.create(userPayload)).rejects.toEqual(errorExpected)
})

test('should try login with invalid data', async () => {
    const repositoryInstance = new UserRepository()
    const serviceInstance = new UserService(repositoryInstance)

    const authPayload = {
        username: null,
        password: userPayload.password
    }

    const errorExpected = new AppError("O nome de usuário é obrigatório.")

    await expect(async () => await serviceInstance.createAuth(authPayload)).rejects.toEqual(errorExpected)
})

test('should try login without db connection', async () => {
    const repositoryInstance = new UserRepository()
    const serviceInstance = new UserService(repositoryInstance)
    repositoryInstance.hasDbConnection = false

    const authPayload = {
        username: userPayload.username,
        password: userPayload.password
    }

    const errorExpected = new AppError("Db connection.")

    await expect(async () => await serviceInstance.createAuth(authPayload)).rejects.toEqual(errorExpected)
})

test('should try login with nonexistent user', async () => {
    const repositoryInstance = new UserRepository()
    const serviceInstance = new UserService(repositoryInstance)

    const authPayload = {
        username: `${userPayload.username}-foo`,
        password: userPayload.password
    }

    const errorExpected = new AppError("Confira se o nome de usuário ou senha são validos.")

    await expect(async () => await serviceInstance.createAuth(authPayload)).rejects.toEqual(errorExpected)
})

test('should try login with incorrect password', async () => {
    const repositoryInstance = new UserRepository()
    const serviceInstance = new UserService(repositoryInstance)

    const { username } = await serviceInstance.create(userPayload)

    const authPayload = {
        username,
        password: 'wrongpassword'
    }

    const errorExpected = new AppError("Confira se o nome de usuário ou senha são validos.")

    await expect(async () => await serviceInstance.createAuth(authPayload)).rejects.toEqual(errorExpected)
})
