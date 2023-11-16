import { Injectable, NestMiddleware} from '@nestjs/common'
import type { Request, Response, NextFunction } from 'express'

@Injectable()
export class ClassLoggerMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: NextFunction) {
    console.log(req, res, '中间件执行...')
    next()
  }
}