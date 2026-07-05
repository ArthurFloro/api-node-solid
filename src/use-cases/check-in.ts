import type { CheckIn } from 'generated/prisma/client.js'
import type { CheckInsRepository } from '@/repositories/check-ins-repository.js'
import type { GymsRepository } from '@/repositories/gyms-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private chekInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const checkInOnSameDate = await this.chekInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new Error('Check-in already exists for this user and date.')
    }

    const checkIn = await this.chekInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
