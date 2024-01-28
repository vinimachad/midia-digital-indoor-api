import { NextFunction, Request, Response } from 'express'
import AWSManager from '@configs/aws'

const upload = async (
  req: Request,
  res: Response,
  next: NextFunction,
  path: string
) => {
  if (!req.files) return res.status(500)

  let files = req.files.files
  let aws = new AWSManager()

  try {
    let url = await aws.upload(path, files)
    next()
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const uploadBanners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await upload(req, res, next, 'banners/')
}
