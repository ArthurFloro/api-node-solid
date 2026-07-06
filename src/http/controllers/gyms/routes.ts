import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt.js'

export async function GymsRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get('/me', {onRequest: [verifyJWT]},profile)
}
