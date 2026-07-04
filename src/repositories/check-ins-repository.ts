import type { CheckIn, Prisma } from 'generated/prisma/client.js'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
