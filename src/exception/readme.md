# Exception filters

  Nest comes with a built-in **Exceptions Layer** which is responsible for processing all unhandled exceptions across an application.
  When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate 
  user-friendly response.
  (Nest有一个内置的异常处理层 用来处理整个应用程序中未捕获的异常.会给客户端返回一个用户友好的响应.)

## Standard Exceptions

```ts
import { HttpException, HttpStatus, Controller, Get } from '@nestjs/common'

@Controller('exception')
export class ExceptionController {
  @Get('phone-list')
  getPhoneList () {
    // 返回一个被禁止的 响应
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }
  /**
   * {
   *    statusCode: 403,
   *    message: 'Forbidden'
   * }
  */
}
```
### HttpException

  The **HttpException** constructor takes two required arguments which determine the response:
1. The *response* argument defines the JSON response body
2. The *status* argument defines the **Http status code**

  (HttpException 构造函数接受两个参数, 第一个参数定义返回的主体信息, 第一个参数用来定义状态码)

```ts
// 1. response 为一个字符串
throw new HttpException('hello world', HttpStatus.FORBIDDEN)
/**
 * {
    statusCode: 403,
    message: "hello world"
    }
*/

// 2. response为对象
throw new HttpException({
  statusCode: HttpStatus.FORBIDDEN,
  message: 'hello world123',
}, HttpStatus.FORBIDDEN)
/**
 * {
    statusCode: 403,
    message: "hello world123"
    }
 * 
*/
```
  To override just the *message* portion of the JSON response body, supply a string in the response argument.
  To override the entire JSON response body, pass an object in the *response* argument

```ts
// 覆盖整个 json body (官网文档 HttpException 需要两个必须参数, 但是下面的 响应只传递 response 也会正常返回数据 --- (禁止ts警告))
throw new HttpException({
  status: HttpStatus.FORBIDDEN,
  message: '我是一条错误的消息',
  data: [],
  list: []
}, HttpStatus.FORBIDDEN)
/**
 * {
    status: 403,
    message: "我是一条错误的消息",
    data: [ ],
    list: [ ]
    }
 * 
*/
```

### Built-in HttpException

1. BadRequestException
2. UnauthorizedException
3. NotFoundException
4. ForbiddenException
5. RequestTimeoutException

## Custom Exceptions

  大多数情况下你不需要自定义的异常过滤器, 如果你需要自定义异常过滤器, 它继承自 **HttpException**。
```ts
// custom-exception-filter.ts
import { HttpException, HttpStatus } from '@nestjs/common'
export class CustomUnAuthorizedExceptionFilter extends HttpException {
  constructor() {
    super('你还没有获得足够的权限哦', HttpStatus.UNAUTHORIZED)
  }
}

// exception.controller
import { CustomUnAuthorizedExceptionFilter } from './custom-exception-filter.ts'
@Controller('/exception')
export class ExceptionController {
  @Get('/xxx')
  getPhoneList () {
    throw new CustomUnAuthorizedExceptionFilter()
  }
  /**
   * {
      statusCode: 401,
      message: "你还没有获得足够权限哦"
    }
  */
}
```

## Exception Filters

  Sometimes you may want **full control** over the exceptions layer. For example you may want to add logging or use a different JSON schema based on
  some dynamic factors. They let you control the exact flow of control and the content of the response sent back to the client.
  (有时我们需要对异常逻辑处理有完全的控制, 比如想要添加日志 或者 使用一个 不同的 JSON响应模式.)

  To to this, we will need to access the underlying platform **Request** and **Response** objects.

```ts
import type { Request, Response } from 'express'
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

// tell nest this particular filter is looking for exceptions of type HttpException.
@Catch(HttpException)
/**
 * All exception filters should implement the generic ExceptionFilter<T>. T indicates the type of the exception.
 * (所有的 exception filters需要实现 ExceptionFilter接口)
*/
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    /**
     * We use it to obtain a reference to the Request and Response objects that are being passed to the original request
     * handler (获取原始的请求和响应对象)
    */
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: Date.now(),
        path: request.url
      })
  }
}

// binding filters
import { Controller, UseFilters } from '@nestjs/common'

@Controller()
export class CatController {
  @Post()
  // 传递一个实例
  @UseFilters(new HttpExceptionFilter())
  // 也可以直接传递一个构造函数 (Prefer applying filters by using classes instead of instances when possible)
  @UseFilters(HttpExceptionFilter)
  create () {
    throw new ForbiddenException()
    /**
     * {
          statusCode: 403,
          timestamp: 1700635371923,
          path: "/api/v1/exception/phone_list"
        }
    */
  }
}

// controller-level
@UseFilters(HttpExceptionFilter)
export class CatController {

}

// global-scoped filter
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000)
}
```