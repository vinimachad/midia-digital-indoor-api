import { NextFunction, Request, Response } from 'express'

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error)
  res.status(500).send({ errors: [{ message: 'Something went wrong' }] })
}
