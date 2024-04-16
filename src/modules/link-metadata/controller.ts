import linkMetadataModel from '@modules/link-metadata/get-link-metadata'
import { Request, Response } from 'express'

export default () => {
  async function post(req: Request, res: Response) {
    let { url } = req.body
    let results = await linkMetadataModel.getLinkMetadata(url)
    res.status(200).json({ results })
  }

  return { post }
}
