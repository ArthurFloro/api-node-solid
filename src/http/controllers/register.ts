import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { RegisterUseCase } from '@/use-cases/register.js'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
  })

  const { name, email, password } = requestBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
