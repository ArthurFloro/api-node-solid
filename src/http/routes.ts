import type { FastifyInstance } from 'fastify'
import { register } from './controllers/register.js'
import { authenticate } from './controllers/authenticate.js'
import { profile } from './controllers/profile.js'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/env/index.js'
import { verifyJWT } from './middlewares/verify-jwt.js'

export async function appRoutes(app: FastifyInstance) {
  app.register(fastifyJwt, {
    secret: env.JWT_SECRET
  })

  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get('/me', {onRequest: [verifyJWT]},profile)
}
