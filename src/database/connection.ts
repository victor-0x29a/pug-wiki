import { PrismaClient } from "@prisma/client"

const { PrismaClient: entityPrismaClient } = require('@prisma/client')

export const db = new entityPrismaClient() as PrismaClient
