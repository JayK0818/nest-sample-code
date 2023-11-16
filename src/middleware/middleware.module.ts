import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MiddlewareController } from './middle.controller'
import { ClassLoggerMiddleware } from './class-middleware.logger'

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

export class MiddlewareModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    await sleep(10);
    consumer.apply(ClassLoggerMiddleware)
      .forRoutes('middleware')
  }
}