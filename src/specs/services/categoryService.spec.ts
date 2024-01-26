// @ts-nocheck
import { CategoryRepository } from '../repositories/categoryRepository'
import { CategoryService } from '../../entities/category'
import { AppError } from '../../appError'

test('should create a category', async () => {
    const repository = new CategoryRepository()
    const service = new CategoryService(repository)
    const data = {
        "label": "foo",
        "slug": "bar-slug"
    }
    const request = await service.create(data)
    await expect(request).toStrictEqual({
        "id": 1,
        ...data
    })
})

test('should doesnt create a category without slug', async () => {
    const repository = new CategoryRepository()
    const service = new CategoryService(repository)
    const data = {
        "label": "foo",
        "slug": ""
    }
    await expect(async () => await service.create(data)).rejects.toEqual(new AppError("O slug é obrigatório."))
})


test('should list all categories', async () => {
    const repository = new CategoryRepository()
    const service = new CategoryService(repository)

    const requestWithEmptyCategories = await service.findAll()

    expect(requestWithEmptyCategories).toEqual([])

    const data = {
        "label": "foo",
        "slug": "bar-slug"
    }
    const dataExpected = {
        "id": 1,
        ...data
    }
    const requestToCreate = await service.create(data)
    await expect(requestToCreate).toStrictEqual(dataExpected)

    const requestWithUsersFilled = await service.findAll()
    expect(requestWithUsersFilled).toEqual([data])
})