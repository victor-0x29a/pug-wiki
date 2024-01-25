import { getStatusDebugger } from '../../utils'

test('should return false when the NODE_ENV is different that dev', () => {
    process.env.NODE_NAME = 'production'
    expect(getStatusDebugger().isEnabledDebugger).toEqual(false)
})

test('should return true when the NODE_ENV is dev', () => {
    process.env.NODE_NAME = 'dev'
    expect(getStatusDebugger().isEnabledDebugger).toEqual(false)
})