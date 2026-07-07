import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case.js'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case.js'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
        gymId: z.uuid()
    })

  const crateCheckInBodySchema = z.object({
     latitude: z.number().refine(value => {
        return Math.abs(value) <= 90 
     }), 
    longitude: z.number().refine(value => {
        return Math.abs(value) <= 180
    })
  })

  const {gymId} = await createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } =  crateCheckInBodySchema.parse(request.body)

    const checkInUsecase = makeCheckInUseCase()

    await checkInUsecase.execute({
        gymId, 
        userId: request.user.sub, 
        userLatitude: latitude, 
        userLongitude: longitude
    })
  
  return reply.status(201).send()
}
