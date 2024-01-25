import { getViewByPath } from '../../utils'


test('should return the path from view', () => {
    const viewPath = 'bar'
    const path = `/foo/${viewPath}`
    expect(getViewByPath({ path })).toEqual(viewPath)
})