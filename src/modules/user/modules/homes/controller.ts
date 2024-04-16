import { Request, Response } from 'express'
import { IValidateMenuUseCase } from './use-cases/validate-menu'

interface HomesControllerDTO {
  validateMenuUseCase: IValidateMenuUseCase
}

export default ({ validateMenuUseCase }: HomesControllerDTO) => {
  async function commercialUploadMenu(req: Request, res: Response) {
    let authorization = req.headers.authorization ?? ''
    const [_, token] = authorization.split(' ')
    const results = await validateMenuUseCase.execute(token)
    res.json({ results })
  }
  return { commercialUploadMenu }
}
