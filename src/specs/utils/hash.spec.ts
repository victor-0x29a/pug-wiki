/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { generateHash, compareHash } from '../../utils'

describe('generateHash and compareHash with success', () => {
    const commonWord = 'foo'
    const otherCommonWord = 'bar'
    const hashedWord = generateHash(commonWord)

    test('should is differente that common word the hashed word', () => {
        expect(hashedWord).not.toEqual(commonWord)
    })

    test('should pass the compare hash', async () => {
        const compareResult = await compareHash(hashedWord, commonWord)
        expect(compareResult).toEqual(true)
    })

    test('should not pass on the compare hash', async () => {
        const compareResult = await compareHash(hashedWord, otherCommonWord)
        expect(compareResult).toEqual(false)
    })
})

describe('generateHash and compareHash with fail', () => {
    const commonWord = 'foo'
    const hashedWord = generateHash(commonWord)
    const otherDataToHash = ['foo', 'bar']

    test('should fail the generateHash', () => {
        expect(() => generateHash(otherDataToHash)).toThrowError()
    })

    test('should fail the compareHash', async () => {
        await expect(compareHash(hashedWord, otherDataToHash)).rejects.toThrow()
    })
})