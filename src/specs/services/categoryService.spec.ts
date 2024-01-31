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
    await expect(async () => await service.create(data)).rejects.toEqual(new AppError("O slug é obrigatório.", true, "O slug é obrigatório.", 422))
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

test('should doesnt list all categories when havent database connection', async () => {
    const repository = new CategoryRepository()

    repository.hasDbConnection = false

    const service = new CategoryService(repository)

    expect(async () => await service.findAll()).rejects.toEqual(new AppError('Db connection.'))
})

test('should doesnt create a category when havent database connection', async () => {
    const repository = new CategoryRepository()

    repository.hasDbConnection = false

    const service = new CategoryService(repository)
    const data = {
        "label": "foo",
        "slug": "bar-slug"
    }

    expect(async () => await service.create(data)).rejects.toEqual(new AppError('Db connection.'))
})

test('should doesnt create a category with slug from other category', async () => {
    const slug = "foo-bar"
    const repository = new CategoryRepository()
    const service = new CategoryService(repository)
    const data = {
        "label": "foo",
        slug
    }
    const _firstRequest = await service.create(data)

    await expect(async () => await service.create(data)).rejects.toEqual(new AppError("Já existe uma categoria com o mesmo slug.", true, "Já existe uma categoria com o mesmo slug.", 409))
})

test('should delete a category', async () => {
    const slug = "foo-bar"
    const repository = new CategoryRepository()
    const service = new CategoryService(repository)
    let data = {
        "label": "foo",
        slug
    }
    const _createRequest = await service.create(data)
    const deleteRequest = await service.delete({ slug })

    data = {
        "id": 1,
        ...data
    }
    await expect(deleteRequest).toEqual(data)
})

test('should not delete a nonexistent category', async () => {
    const repository = new CategoryRepository()
    const service = new CategoryService(repository)

    await expect(async () => await service.delete({ slug: 'foo' }))
        .rejects.toEqual(new AppError('Categoria inexistente.', true, 'Categoria inexistente.', 404))
})

test('should not delete a category without slug', async () => {
    const repository = new CategoryRepository()
    const service = new CategoryService(repository)

    await expect(async () => await service.delete({ slug: '' }))
        .rejects.toEqual(new AppError("O slug é obrigatório.", true, "O slug é obrigatório.", 422))
})