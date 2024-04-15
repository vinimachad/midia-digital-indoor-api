import { IHomesModel } from '@models/user/homes-model'
import { Request, Response } from 'express'

interface HomesControllerDTO {
  homesModel: IHomesModel
}

export default ({ homesModel }: HomesControllerDTO) => {
  async function commercialUploadMenu(req: Request, res: Response) {
    let authorization = req.headers.authorization ?? ''
    const [_, token] = authorization.split(' ')
    const results = await homesModel.validateCommercialMenuBySubscription(token)
    res.json({ results })
  }
  return { commercialUploadMenu }
}
