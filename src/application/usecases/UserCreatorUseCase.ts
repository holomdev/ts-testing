import { User } from '@/domain/entities/User'
import { UserRepository } from '@/domain/repositories/UserRepository'
import { ExistUserByUserName } from '@/domain/services'
import { UserAlreadyExistsException } from '@/domain/exceptions/UserAlreadyExistsExceptions'

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existsUserByUserName: ExistUserByUserName

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._existsUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run (body: User): Promise<User> {
    const existsUser = await this._existsUserByUserName.run(body.username)

    if (existsUser) throw new UserAlreadyExistsException()

    const userCreated = await this._userRepository.save(body)
    return userCreated
  }
}
