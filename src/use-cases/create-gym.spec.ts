import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import  { CreateGymUseCase } from './create-gym.js'


let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'javaScript Gym',
      description: null,
      phone: null,
      latitude: -8.0058014,
      longitude: -34.8898221,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
