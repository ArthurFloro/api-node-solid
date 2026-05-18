import fastify from 'fastify'
import { register } from './http/controllers/register.js'
import { appRoutes } from './http/routes.js'

export const app = fastify()

app.register(appRoutes)
