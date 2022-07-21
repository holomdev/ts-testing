import 'module-alias/register'
import { UserCreatorUseCase } from '@/application/usecases'
import { User } from '@/domain/entities/User'
import { InMemoryUserRepository } from '@/infrastructure/implementations/in-memory';

(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository()

  console.log(inMemoryUserRepo.userData)

  const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepo)
  const userToCreate: User = {
    name: 'fabio',
    age: 36,
    username: 'holomdev',
    id: 'abc'
  }
  await userCreatorUseCase.run(userToCreate)

  console.log(inMemoryUserRepo.userData)
})()
