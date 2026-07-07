import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case.js'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case.js'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParamsSchema = z.object({
        checkInId: z.uuid()
    })


  const {checkInId} = await validateCheckInParamsSchema.parse(request.params)


    const validateCheckInUseCase = makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({
        checkInId
    })
  
  return reply.status(204).send()
}
