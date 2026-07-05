import type { Gym, Prisma } from 'generated/prisma/client.js'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(date: Prisma.GymCreateInput): Promise<Gym>
}
