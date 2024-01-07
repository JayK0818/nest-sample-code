# Execution Context

Execution Context can be used to build generic **guards** **filters** and **interceptors** that can
work across a broad set of controllers, methods and execution contexts
(执行上下文 可以用来 创建 通用的 守卫/ 过滤器/和拦截器 在一系列 的控制器,方法 中使用。)

## ArgumentsHost Class

ArgumentsHost simply acts an abstraction over a handler's arguments. For example, for HTTP server applications, the **host** object encapsulates Express's [request, response, next] array.
(在 express 中, argumentsHost 解构 request, response, 和 next 三个对象/函数)

```ts
{
  const type = host.getType();
  // http / rpc / graphl
}

// 通过getArgs() 解构获取参数
const [req, res, next] = host.getArgs();

// 获取指定的参数
const request = host.getArgByIndex(0);
const response = host.getArgByIndex(1);

// using one of the host object's utility methods to switch to the appropriate application
// context for your application. (使用host对象的工具函数转换到合适的上下文对象)
const http = host.switchToHttp();
const request = http.getRequest();
const response = http.getResponse();
```

## ExecutionContext Class

**ExecutionContext** extends **ArgumentsHost**, providing additional details about the current execution process.
(ExecutionContext 类继承自 ArgumentsHost, 并提供了一些关于当前进程的其他细节。可以在守卫的 canActivate() 方法 或者 拦截器的 intercept() 方法中使用)

```ts
export interface ExecutionContext extends ArgumentsHost {
  getClass<T>(): Type<T>;
  getHandler(): Function;
}
```

1. getHandler()
   The **getHandler()** method returns a reference to the handler about to be invoked. (getHandler()方法返回一个 被调用方法的引用。)
   The **getClass()** method returns the type of the **Controller** class which this particular handler belongs to.

```ts
// auth.guard
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const class = context.getClass().name
    // create
    const function = context.getHandler().name
    // CatsController
    // context.getClass() returns the CatsController class (not instance)
  }
}

// controller.ts
@UseGuards(AuthGuard)
@Controller()
export class CatsController {
  create() {
    return 'success';
  }
}
```

## Reflection and metadata

Nest provides the ability to attach **custom metadata** to route handlers through decorators
created via **Reflector#createDecorator** method, and the built-in **@SetMetadata()** decorator.

### createDecorator

```ts
// role.decorator.ts
import { Reflector } from '@nestjs/core';
export const Roles = Reflector.createDecorator<string[]>();

// 使用控制器
// controller.ts
export class CatsController {
  @Roles(['admin'])
  create() {}
}

// guard.ts
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    // read the handler metadata, use the get() method
    const roles = this.reflector.get(Roles, context.getHandler());
  }
}
```

The **Reflector#get** method allows us to easily access the metadata by passing in two arguments.
a decorator reference and a **context**
(Reflector.get() 方法接受两个参数, 第一个参数是 decorator 的引用 和一个 context.getHandler())

**getHandler()** gives us a **reference** to the route handler function.

```ts
// cats.controller.ts
// controller level
@Roles(['admin'])
@Controller()
export class CatsController {}

// auth.gurad
{
  // ...
  const roles = this.reflector.get(Roles, context.getClass());
}
```

Given the ability to provide metadata at multiple levels. You may need to extract and merge metadata
from serval context. (不同 level 的 metadata, 可以提取并合并元信息。)

```ts
const merge_roles = this.reflector.getAllAndOverride(Roles, [
  context.getHandler(),
  context.getClass(),
]);
// ['user']

const merge_roles = this.reflector.getAllAndOverride(Roles, [
  context.getClass(),
  context.getHandler(),
]);
// ['admin']
// getAllAndOverride() 第二个参数数组中 哪个在前面 就使用哪个值

const merge_roles = this.reflector.getAllAndMerge(Roles, [
  context.getClass(),
  context.getHandler(),
]);
// ['admin', 'user']
```

## SetMetadata()

You can also use the built-in **@SetMetadata()** decorator to attach metadata to a handler.
You have more control over the metadata key and value. and also can create decorators that take more than one argument.
(使用 SetMetadata 对元信息的键和值有更多的控制, 也可以传递更多的参数)

```ts
// xxx.controller.ts
import { Controller, SetMetadata } from '@nestjs/common';

@Controller()
export class CatController {
  @Get('player-list')
  @SetMetadata('roles', ['admin'])
}

// auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    console.log(roles) // ['admin']
  }
}
```

It is not good practice to use **@SetMetadata()** directly in your routes. (在路由中直接使用 SetMetadata 不推荐)

```ts
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```
