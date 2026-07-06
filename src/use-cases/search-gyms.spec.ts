import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms.js'


let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -8.0058014,
            longitude: -34.8898221,
        })

        await gymsRepository.create({
            title: 'TypeScript Gym',
            description: null,
            phone: null,
            latitude: -8.0058014,
            longitude: -34.8898221,
        })

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym' }),
        ])
    })

    it('should be able to fetch pagineted gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JavaScript Gym ${i}`,
                description: null,
                phone: null,
                latitude: -8.0058014,
                longitude: -34.8898221,
            })
        }

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym 21' }),
            expect.objectContaining({ title: 'JavaScript Gym 22' })
        ])
    })

})
