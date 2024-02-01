import { PrismaClient } from "@prisma/client"

const DATABASE = new PrismaClient({
    errorFormat: 'minimal'
}) as PrismaClient

const { user, category } = DATABASE

export {
    user,
    category
}