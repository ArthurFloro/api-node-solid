import type { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma.js'
import z from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
  })

  const { name, email, password } = requestBodySchema.parse(request.body)

  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
        email
    }
  })

  if (userWithSameEmail) {
    return reply.status(409).send()
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    },
  })

  return reply.status(201).send()
}
