import { Request, Response, NextFunction } from 'express'
/**
 * @description 函数式 中间件
*/
export function logger (req: Request, res: Response, next: NextFunction) {
  console.log(req, res)
  console.log('function-middleware')
  next()
}

// 打印日期的中间件
export function logger_request_date_middleware (req: Request, res: Response, next: NextFunction) {
  console.log(Date.now())
  next()
}