# Middleware

  Middleware is a function which is called **before** the route handler。Middleware function have access to the **request** and
  **response** objects. (中间件是一个函数 执行顺序在路由方法调用之前, 下一个中间件通常使用变量 **next** 表示)。

  You implement custom Nest middleware in either a function, or in a class with an **@Injectable()** decorator. The class should implement
  the **NestMiddleware** interface, while the function does not have any special requirements.
  (自定义中间件可以使用两种方式: 函数或者一个使用 **@Injectable()** 装饰器的类。类需要实现 **NestMiddleware** 接口, 但是函数中间件 没有特别的要求。)

## class-middleware

```ts
// 定义一个class中间件
import { Injectable, NestMiddleware } from '@nestjs/common'
import type { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: NextFunction) {
    console.log(req, res)
    next()
  }
}

// 使用定义的中间件
/**
 * We set them up using the configure() method of the module class
 * 使用中间件的 Module 需要实现 NestModule 接口
*/
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import ClassLoggerMiddleware from './class-logger.middleware'
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(ClassLoggerMiddleware)
      .forRoutes('middleware') // 针对定义的 /middleware 路由 (一组路由方法)
  }
}
```
  We may also further restrict a middleware to a particular request method by passing an object containing the route **path**
  and request **method** to the **forRoutes()** (如果你想应用中间件到某个特定的请求 可以传递一个对象给forRoutes())

```ts
import { RequestMethod } from '@nestjs/common';

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClassLoggerMiddleware)
      .forRoutes({
        method: RequestMethod.GET,
        path: 'middleware/logger'
      })
      // 下面的controller中 定义的logger路由方法才会执行中间件
  }
}

@Controller('middleware')
export class AppController {
  @Get('logger')
  handleLogger () {
    return 'logger'
  }
  @Get('login')
  handleLogin () {
    return '登录...'
  }
}
```
  **configure()** 方法也可以使用异步, 可以使用 **async/await 语法**

```ts
// 一个异步使用的例子
const sleep = (timeout: number = 2): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout * 1000)
  })
}

@Injectable()
export class AppModule implements NestModule {
  async config(consumer: MiddlewareConsumer) {
    await sleep(5)
    consumer
      .apply(ClassLoggerMiddleware)
      .forRoutes('middleware')
  }
}
```