import UserController from './controller'
import CreateUserUseCase from './use-cases/create-user'
import GetUserInfosUseCase from './use-cases/get-user-infos'
import LoginUserUseCaseTsUseCase from './use-cases/user-login'

export default class UserFactory {
  static controller() {
    return UserController(new CreateUserUseCase(), new LoginUserUseCaseTsUseCase(), new GetUserInfosUseCase())
  }
}
