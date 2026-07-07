import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case.js'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryBodyQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = checkInHistoryBodyQuerySchema.parse(request.query)

    const FetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

    const {checkIns} = await FetchUserCheckInsHistoryUseCase.execute({
        userId: request.user.sub, 
        page
    })
  
  return reply.status(200).send({
    checkIns
  })
}
