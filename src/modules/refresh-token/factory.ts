import RefreshTokenController from './controller'
import CanRefreshTokenUseCaseUseCase from './use-cases/can-refresh-token'

export default class RefreshTokenFactory {
  static controller() {
    return new RefreshTokenController(new CanRefreshTokenUseCaseUseCase())
  }
}
