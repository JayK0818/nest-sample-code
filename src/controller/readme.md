# Controllers

  Controllers are responsible for handling incoming **requests** and returning **responses** to the client.
  (控制器的职责是接收客户端的请求以及返回返回响应到客户端)

  The **routing** mechanism controls which controller receives which requests. Each controller has more than one route, and different
  routes can perform different actions
  (路由机制控制着哪个控制器接收哪个请求, 通常每个控制器不止一个路由, 并且不同的路由有不同的行为。)

## Routing

  Using a path prefix in a **@Controller()** decorator allows us to easily group a set of related routes, and minimize repetitive code.
  (使用路由前缀让我们很容易将一组相关路由分组 并且减少重复代码)
```ts
import { Controller, Get } from '@nestjs/common'
@Controller('cats') // route path prefix
export class CatsController {
  // 请求路径是 /cats/list
  @Get('list')
}
```
  What is the route path? The route path for a handler is determined by concatenating the (optional) prefix declared for the controller, and any path specified in the method's decorator.
  (路由是 可选的装饰器设置的路由前缀以及 每个请求方法的路径 拼接起来的)

## Response

1. Using built-in method, when a request handler return a JavaScript object or array, it will automatically be serialized to JSON
  如果返回一个对象或者数组 将会被内置方法自动序列化为JSON。(状态码默认为200， POST为201)

2. We can use the library-specific **response object**, which can be injected using **Res()** decorator in the method handler signature 
  也可以使用 **@Res()** 装饰器 使用框架层面的对象方法 返回响应。 **response.status(200).json()**

```ts
import { Controller, Get } from '@nestjs/common'

@Controller()
export class CatsController {
  @Get()
  getPlayer(@Res()) { // 这种方式无法正确返回响应(使用了 @Res() / @Next()) 表明使用了框架层面的返回数据方式, 无法直接返回一个数组
    return ['hello', 'world']
  }
  @Get()
  getPlayerList(@Res({ passthrough: true })) { // 传递一个 passthrough 参数
    return ['你好', '世界']
  }
}
```
### StatusCode

```ts
import { HttpCode } from '@nestjs/common'
{
  @HttpCode(201)  // 修改响应的状态码
  @Post()
  createPlayer () {
    // ...
  }
}
```
### Headers

  指定一个自定义的响应头。
```ts
import { Header } from '@nestjs/common';

@Post()
@Header('Cache-Control', 'none')
getPlayer () {
  // ...
}
```

### Redirect

  重定向
```ts
import { Redirect } from '@nestjs/common'

{
  @Get('website')
  @Redirect('https://www.baidu.com', 302)
  getPlayerWebsite() {
  }
  // 访问 website 将会重定向至 baidu.com
}
```

## Request Object

  We can access the request object by instructing Nest to inject it by adding the **@Req()** decorator to the handler's signature.

```ts
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  // @Req() is an alias for @Request()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```
  请求对象通常包含 查询参数, 动态参数 HTTP请求头, body内容等。通常情况下不需要手动获取这些属性值。可以使用内置的装饰器
  **@Session()**, **@Param()**, **@Body()**, **@Query()** 等。

  请求方法: **Get()**, **Post()**, **Put()**, **Head()**, **All()**等。

### Route parameters

  Route parameters can be accessed using the **@Param()** decorator.

```ts
// 动态路由参数应该在任何静态路径之后定义。
@Get(':id')
findPlayer (@Param() params: any) {
  console.log(params.id)
}
```
  **@Param()** is used to decorate a method parameter and makes the **route** parameters available as properties of that decorated method parameter inside the body of the method. (可以在方法体中的参数通过对象属性的方式 获取路由动态参数)。

```ts
import { Param } from '@nestjs/common'
{
  @Get(':id')
  findOne (@Param('id') id: string) {
    console.log(id, typeof id) //动态路径参数是一个字符串
  }
}
```

### Request payloads

  接收来自客户端的参数。
  A **DTO** (Data Transfer Object) schema is an object that defines how the data will be sent over the network. (可以使用 TypeScript interfaces
  或者使用 classes, 建议使用 classes). Classes are part of the JavaScript ES6 standard, and therefore they are preserved as a real entities in the
  compiled JavaScript. Since TypeScript interfaces are removed during the transpilation，Nest can not refer to them at runtime. 
  (Class是ES标准的一部分, 但是ts接口在编译之后会被移除, nest 在运行时无法引用它们。)

````ts
// create-player.ts
export class CreatePlayerDto {
  firstName: string
  lastName: string
  age: number
}

// player.controller.ts
import { Post, Body } from '@nestjs/common';+
{
  @Post('/create')
  // 使用方式
  createPlayer(@Body() player: CreatePlayerDot) {
    console.log(player)
  }
}
```