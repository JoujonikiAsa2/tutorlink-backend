import { NextFunction, Request, RequestHandler, Response } from 'express'

export const asyncHandler = async (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
      console.log(err)
      next(err)
    })
  }
}
