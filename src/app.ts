import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes.js'
import z, { ZodError } from 'zod'
import { env } from './env/index.js'
import { gymsRoutes } from './http/controllers/gyms/routes.js'
import { checkInsRoutes } from './http/controllers/check-ins/routes.js'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: z.treeifyError(error),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: here we shoul log to on external tool like DataDog, Sentry, LogRocket, etc
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
