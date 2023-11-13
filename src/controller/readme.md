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
  @Get('list')
}
```
  What is the route path? The route path for a handler is determined by concatenating the (optional) prefix declared for the controller, and any path specified in the method's decorator.
  (路由是 可选的装饰器设置的路由前缀以及 每个请求方法的路径 拼接起来的)