import { UserRepository } from '@/domain/repositories/UserRepository'
import { MockProxy, mock } from 'jest-mock-extended'
import { UserCreatorUseCase } from '@/application/usecases'
import { User } from '@/domain/entities/User'
import { UserAlreadyExistsException } from '@/domain/exceptions/UserAlreadyExistsExceptions'

describe('UserCreatorUseCase', () => {
  let userRepo: MockProxy<UserRepository>
  let sut: UserCreatorUseCase
  let user: User

  beforeAll(() => {
    user = { id: 'any_id', name: 'any_name', username: 'any_username' }
    userRepo = mock()
    userRepo.save.mockResolvedValue(Promise.resolve(user))
  })

  beforeEach(() => {
    sut = new UserCreatorUseCase(userRepo)
  })

  it('should call UserRepository with correct params', async () => {
    await sut.run(user)
    expect(userRepo.save).toHaveBeenCalledWith(user)
    expect(userRepo.save).toHaveBeenCalledTimes(1)
  })

  it('should return a User when UserRepository return data', async () => {
    const newUser = await sut.run(user)
    expect(newUser).toEqual(user)
  })

  it('should rethrow if ExistUserByUserName throws', async () => {
    userRepo.getByUsername.mockResolvedValueOnce(Promise.resolve(user))
    const promise = sut.run(user)
    await expect(promise).rejects.toThrow(new UserAlreadyExistsException())
  })
})
