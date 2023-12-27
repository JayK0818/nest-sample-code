# Interceptors

An interceptor is a class annotated with the **Injectable()** decorator and implements the **NestInterceptor** interface.
(拦截器是一个使用 @Injectable() 装饰器的 类 并且实现了 NestInterceptor 接口 )

interceptors have a set of useful capabilities which are inspired by the **Aspect Oriented Programming**(AOP)
technique. (灵感来自于面向切面编程)

## Usage

1. bind extra logic before/after method execution (在方法执行前/后绑定一些额外的逻辑)
2. transform the result returned from a function (转换返回的结果)
3. transform the exception thrown from a function (转换抛出的异常)
4. completely override a function depending on specific conditions(根据特定情况完全覆盖函数)

## Basic

Each interceptor implements the **interceptor()** method, which takes two arguments. The first one is the **ExecutionContext** instance.
The second argument is a **CallHandler**. The **CallHandler** interface implements the **handle()** method. which
you can use to invoke the route handler method at some point in your interceptor.
(每个拦截器都实现了 interceptor() 方法, 该方法接受两个参数, 第一个参数是 ExecutionContext 上下文实例, 第二个参数是一个 CallHandler 接口, 该接口实现 handle()方法, 你可以在某个节点执行该方法.)

If you do not call the **handle()** method in your implementation of the **intercept()** method, the route handler
method will not be executed at all.
(如果没有执行 interceptor 拦截器的第二个参数 handle() 方法, 路由方法不会执行)

The **handle()** method returns an **Observable**.

以下案例来自官网

```ts
// logging interceptors
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`after ${Date.now() - now} ms`)));
  }
}

// 绑定 拦截器
// cat.controller.ts
import { UseInterceptors, Get } from '@nestjs/common';
// controller level
UseInterceptors(LoginInterceptor);
@Controller()
export class CatController {
  // method level
  @UseInterceptors(LoginInterceptor)
  @Get()
  handleLogin() {
    return '登录成功';
  }
}
```

## Response Mapping

下面创建一个转换响应数据的 interceptor, 将 router 方法中的数据 包裹在 一个对象里。(以下 Demo 来自 nest 官网)

```ts
// transform.interceptor.ts
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return (
      next
        .handle()
        /**
         * assign the response object to the data property of a newly created object,
         * returning the new object to the client.
         */
        .pipe((data) => ({ data, code: 1, message: 'success' }))
    );

    /**
     * 其他用途, 对value === null的值进行转换 (下面将null转换为空字符串)
     */
    return next.handle().pipe(map((v) => (v === null ? '' : value)));
  }
}
```

## Exception mapping

拦截异常并返回响应

```ts
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(catchError(() => throwError(() => new BadGatewayException())));
  }
}
```

## Stream overriding

There are serval reasons why we may sometimes want to completely prevent calling the handler and
return a different value instead. (有时需要完全替换返回值 避免路由方法执行)

```ts
// cache.interceptor (这是一段硬编码代码)
import {
  NestInterceptor,
  CallHandler,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    if (false) {
      // the route handler will not be called at all
      return of(1, 2, 3);
    }
    return next.handle();
  }
}
```
