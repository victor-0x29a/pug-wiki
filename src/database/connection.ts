import { PrismaClient } from "@prisma/client"

const { PrismaClient: IPrismaClient } = require('@prisma/client')

export const db = new IPrismaClient({
    errorFormat: 'minimal'
}) as PrismaClient
