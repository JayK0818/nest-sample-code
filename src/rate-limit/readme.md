# Rate Limit

A common technique to protect applications from brute-force attacks is **rate-limiting**

```ts
npm install --save @nestjs/throttler

// usage
app.module.ts
@Module({
  imports: [
    ThrottlerModule.forRoot({
      tttl: 60000,  // milliseconds
      limit: 10 // maximum number of requests within the ttl
    })
  ]
})
```

## Multiple Throttler Definitions

There may come upon times where you want to set up multiple throttling definitions.

```ts
@Module({
  imports: [
    ThrottleModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }
    ])
  ]
})

/**
 * no more than 3 calls in a second, 20 calls in 10 seconds, and 100 calls in a minute.
*/
```

```ts
// 注册为全局守卫
import { ThrottlerGuard } from '@nestjs/throttler'
{
  provide: APP_GUARD,
  useClass: ThrottlerGuard
}

// ----- 或者controller / route层级的守卫
// user.controller.ts
import { ThrottlerGuard } from '@nestjs/throttler'
import { UseGuards } from '@nestjs/common'

@UseGuards(ThrottlerGuard)
@Controller()
export class UserController {
  @Get() {
    return 'hello world'
  }
}
```

## Customization

There may be a time where you want to bind the guard to a controller or globally, but you want to disable
rate limiting for one or more of your endpoints. For that, you can use the **@SkopThrottle()** decorator.
(有些接口如果想禁止访问频次限制, 可以使用 @SkipThrottle()装饰器)

```ts
@Controller()
export class UserController {
  @SkipThrottle()
  @Get()
  getMessage() {
    return 'hello world';
  }
}

// 整个路由跳过访问频次限制
@SkipThrottle()
@Controller('users')
export class UsersController {
  // Rate limiting is applied to this route.
  @SkipThrottle({ default: false })
  dontSkip() {
    return 'List users work with Rate limiting.';
  }
  doSkip() {
    return 'List users work without Rate limiting.';
  }
}
```

There is also the **@Throttle()** decorator which can be used to override the **limit** and **ttl** set in the global module.
(设置 limit 和 ttl 属性覆盖默认全局设置的数值)

```ts
@Controller()
export class UserController {
  @Throttle({ default: { limit: 3, ttl: 6000 } })
  @Get()
  getUserList() {
    return ['hello'];
  }
}
```

## Async Configuration

You may want to get your rate-limiting configuration asynchronously instead of synchronously.
You can use the **forRootAsync()** metho.
(如果想要异步获取配置 而非同步, 可以使用 forRootAsync() 方法)

```ts
import { ThrottlerModule } from '@nestjs/throttler'
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ([
        {
          ttl: config.get('THROTTLER_TTL'),
          limit: config.get('THROTTLER_LIMIT')
        }
      ])
    })
  ]
})
```
