import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { MiddlewareController } from './middle.controller'
// import { ClassLoggerMiddleware } from './class-middleware.logger'
import { logger, logger_request_date_middleware } from './functional-middleware.logger'

const sleep = (timeout: number = 2): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout * 1000)
  })
}

@Module({
  controllers: [MiddlewareController]
})

// 测试未通过
/* export class MiddlewareModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClassLoggerMiddleware)
    .exclude({
      path: 'middleware/without-middleware',
      method: RequestMethod.GET
    })
      .forRoutes(MiddlewareController)
  }
} */


// 只对路径middleware/logger 生效, 访问路径 middleware/login 不生效
/* export class MiddlewareModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(ClassLoggerMiddleware)
      .forRoutes({
        path: 'middleware/logger',
        method: RequestMethod.GET
      })
  }
} */

// 异步 configure
/* export class MiddlewareModule implements NestModule {
  async configure (consumer: MiddlewareConsumer) {
    await sleep(0)
    consumer.apply(FunctionMiddlewareLogger)
      .forRoutes(MiddlewareController)
  }
} */


// multiple middleware and function middleware
export class MiddlewareModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(logger_request_date_middleware, logger)
      .forRoutes(MiddlewareController)
  }
}