import { prisma } from '@/lib/prisma.js'
import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {

    await prisma.user.create({
        data: {
            name: 'Arthur floro',
            email: 'arthur@arthur.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
    })

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'arthur@arthur.com',
            password: '123456'
        })

    const { token } = authResponse.body

    return {
        token
    }
}