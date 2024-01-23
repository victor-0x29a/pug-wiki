import { PrismaClient } from "@prisma/client"

const { PrismaClient: IPrismaClient } = require('@prisma/client')

const DATABASE = new IPrismaClient({
    errorFormat: 'minimal'
}) as PrismaClient

const { user, category } = DATABASE

export {
    user,
    category
}