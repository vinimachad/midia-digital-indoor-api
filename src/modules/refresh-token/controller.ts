import { Request, Response } from 'express'
import { ICanRefreshTokenUseCaseUseCase } from './use-cases/can-refresh-token'

export default class RefreshTokenController {
  constructor(private canRefreshTokenUseCaseUseCase: ICanRefreshTokenUseCaseUseCase) {}

  async refreshToken(req: Request, res: Response) {
    let auth = req.headers.authorization ?? ''
    let [_, token] = auth.split(' ')
    let results = await this.canRefreshTokenUseCaseUseCase.execute(token)

    res.status(200).json({ results })
  }
}
