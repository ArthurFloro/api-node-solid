import type { Gym } from 'generated/prisma/client.js'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}
