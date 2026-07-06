import type { CheckInsRepository } from '@/repositories/check-ins-repository.js'


interface GetUserMetricsUseCaseRequest {
    userId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
    constructor(
        private chekInsRepository: CheckInsRepository,
    ) { }

    async execute({
        userId,
    }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const checkInsCount = await this.chekInsRepository.countByUserId(userId)
        return {
            checkInsCount,
        }
    }
} 
