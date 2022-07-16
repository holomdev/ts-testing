import { UserRepository } from '@/domain/repositories/UserRepository'
import { ExistUserByUserName } from '@/domain/services'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ExistUserByUserName', () => {
  let userRepository: MockProxy<UserRepository>
  let sut: ExistUserByUserName

  beforeAll(() => {
    userRepository = mock()
  })

  beforeEach(() => {
    sut = new ExistUserByUserName(userRepository)
  })

  it('should call UserRepository with correct params', async () => {
    await sut.run('any_username')
    expect(userRepository.getByUsername).toHaveBeenCalledWith('any_username')
    expect(userRepository.getByUsername).toHaveBeenCalledTimes(1)
  })

  it('should return false when UserRepository return null', async () => {
    userRepository.getByUsername.mockResolvedValueOnce(null)
    const existUser = await sut.run('any_username')
    expect(existUser).toBeFalsy()
  })

  it('should return true when UserRepository return User', async () => {
    userRepository.getByUsername.mockReturnValueOnce(Promise.resolve(
      { id: 'any_id', name: 'any_name', username: 'any_username' }
    ))
    const existUser = await sut.run('any_username')
    expect(existUser).toBeTruthy()
  })
})
