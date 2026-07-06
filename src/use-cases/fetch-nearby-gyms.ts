import type { GymsRepository } from '@/repositories/gyms-repository.js'
import type { Gym } from 'generated/prisma/client.js'

interface FetchNearbyGymsUseCaseRequest {
    userlatitude: number
    userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({
        userlatitude,
        userLongitude
    }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userlatitude,
            longitude: userLongitude
        })

        return { gyms }
    }
}
