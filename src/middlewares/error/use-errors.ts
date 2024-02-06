import { NextFunction, Request, Response } from 'express'
import AppError from './error-model'

export default function useErrors(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res
      .status(error.configs.status_code)
      .json({ name: 'APIError', ...error.configs })
  }

  return res.status(500).json({
    error: `${error.message}`,
    message: `Ocorreu um erro inesperado em nossos servidores `
  })
}
