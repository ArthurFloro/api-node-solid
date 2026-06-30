import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register.js'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'

describe('Register Use Case', () => {
  it('should hash passowrd upon registration', async () => {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Arthur Floro',
      email: 'arthur@arthur.com',
      password: '123456',
    })

    console.log(user.password_hash)
  })
})
