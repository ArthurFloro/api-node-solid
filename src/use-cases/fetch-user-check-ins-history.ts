import type { CheckIn } from 'generated/prisma/client.js'
import type { CheckInsRepository } from '@/repositories/check-ins-repository.js'


interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(
    private chekInsRepository: CheckInsRepository,
  ) { }

  async execute({
    userId,
    page
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.chekInsRepository.findManyByUserId(userId, page)
    return {
      checkIns,
    }
  }
}
