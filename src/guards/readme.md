# Guards

  A guard is a class annotated with the **@Injectable()** decorator, which implements the **CanActivate** interface
  (守卫 是一个 使用 @Injectable() 装饰器的类, 实现 CanActivate 接口)

  Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending
  on certain conditions present at run-time.
  (守卫的单一职责是根据运行时的条件 (比如权限, 角色等) 决定一个请求是否能够被路由方法所处理)

  Middleware is a fine choice for authentication, since things like token validation and attaching properties to the **request** object are not
  strongly connected with a particular route context(and it's metadata)
  (中间件对于处理身份验证是一个好的选择, 因为像token 的验证和 附加属性到 request 对象上 和路由上下文 没有强关联)。

  But middleware, it does not know which handler will be executed after calling the **next()** function.

  守卫执行顺序在 所有中间件之后, 在所有的管道和拦截器之前。

## Authorization guard

  Every guard must implement a **canActivate()** function. This function should return a boolean, indicating whether the current request
  is allowed or not。Nest uses the return value to control the next action.

  (每个守卫必须实现 canActivate()函数, 该函数返回一个布尔值, 表明当前请求 是否有允许访问)

```ts
// auth.guards.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate (context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    return true
  }
}
```
## Binding guards

  we set up a controller-scoped guard using the **@UseGuards()** decorator. This decorator may take a single argument, or a coma-separated
  list of arguments.

```ts
// cats.controller.ts
import { UseGuards } from '@nestjs/common'
import { AuthGuards } from './auth.guards.ts'

@Controller()
/**
 * attaches the guard to every handler declared by this controller (控制器的每个方法都会被守卫处理)
*/
@UseGuards(AuthGuards)
export class CatsController {
  /**
   * If we wish the guard to apply only to a single method, we apply the @UseGuards() decorator at the method level.
  */
  @UseGuards(RolesGuard)
  @Post()
  getUserList() {
  }
}
```
  如果AuthGuards 返回false, 将会返回一个 被禁止的 response

```js
{
  statusCode: 403,
  message: "Forbidden resource",
  error: "Forbidden"
}
```

## Reflector#createDecorator

  We're not yet taking advantage of the most important guard feature - the **ExecutionContext**. It does not know about roles, or which
  roles are allowed for each handler.
  (以上, 我们还没有利用路由守卫最重要的特性: 执行上下文对象. 我们还不知道角色, 当前路由被允许访问的角色)

  Could have different permission schemes for different routes, Some might be available only for admin user, and others could be open for
  everyone.
  (可能有不同的路由权限机制, 比如有些路由仅仅对管理员开放, 而其他的路由对所有用户开放)

  Nest provides the ability to attach custom **metadata** to route handlers。

```ts
// roles.decorator.ts
import { Reflector } from '@nestjs/core'
export const Roles = Reflector.createDecorator<string[]>()

// xxx.controller.ts
@Controller()
export class CatsController {
  @Post()
  // we have attached the Roles decorator metadata to this method.
  @Roles(['admin'])
  //...
}
```

## Put it together

```ts
// roles.decorator.ts
import { Reflector } from '@nestjs/core'

export const Roles = Reflector.createDecorator<string[]>()


// role.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from './roles.decorator'

@Injectable()
export class RoleGUard implements CanActivate {
  constructor(reflector: Reflector) {}
  canActivate (context: ExecutionContext) {
    // 获取某个(方法/控制器)上的的元信息
    const roles = this.reflector.get(Roles, context.getHandler())
    const request = context.switchToHttp().getRequest()
    // 此处 可进行 角色 和 用户请求携带的信息 进行判断
    return true
  }
}

// controller.ts
import { Controller, UseGuards } from '@nestjs/common'
import { Roles } from './roles.guard'
import { RoleGuard } from './role.guard'

@Controller()
@UseGuards(RoleGuard)
export class MenuListController {
  @Get('menu_list')
  @Roles(['admin'])
  getMenuList () {
    return ['controller', 'provider', 'middleware']
  }
}
```