# Custom Decorators

Nest provides a set of useful **param decorators** that you can use together with the HTTP route handlers

1. @Request() / @Req()
2. @Response() / @Res()
3. @Next()
4. @Session()
5. @Param()
6. @Body()
7. @Query()

## Param Decorator

using decorator to extract property from request.

```ts
// user.decorator.ts
import { createParamDecortor, ExecutionContext } from '@nestjs/common';
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// 使用上述装饰器
@Get('/:id')
findUser (@User() user: any) {
  console.log(user)
}
```

## Passing data

When the behavior of your decorator depends on some conditions, you can use the **data** parameter to
pass an argument to the decorator's factory function.
(有时装饰器需要依赖于一些条件, 可以使用 data 参数 传递给 装饰器)

```ts
// 对上面的 装饰器 做一个改进 可以接受参数
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[data];
  },
);

// usage
@Get('user-list')
/**
 * You can use this same decorator with different keys to access different properties.
*/
getUserList (@User('username') name: string) {
  return name
}
```

createParamDecorator<T>() 是一个泛型。可以指定执行参数的类型, **createParamDecorator<string>()** 或者
**createParamDecorator<(data: string, context: ExecutionContext) => {}>**, 如果都没有指定, data 类型是 any.
