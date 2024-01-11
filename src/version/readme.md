# Version

Versioning allows you to have **different versions** of your controllers or individual routes
running within the same application.
(版本允许你在同一个应用中 有不同版本的控制器或者 单独的路由)。
There are 4 types of versioning that are supported.

1. URI Versioning
2. Header Versioning
3. Media Type Versioning
4. Custom Versioning

```ts
async function bootstrap = () => {
  const app = await NestFactory.create(AppModule)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    defaultVersion: ['1', '2']
  })
}
```

## URI version

The version in the URI will be automatically prefixed with **v** by default, however the prefix value
can be configured by setting the **prefix** key to your desired prefix
(URI 版本 会自动在路由前缀添加 **v**, 你也可以传递 prefix 指定路由前缀)

```ts
app.enableVersioning({
  type: VersioningType.URI,
  prefix: 'a',
});
```

### Controller version

```ts
// xxx.controller.ts
@Controller({
  version: '1', // controller versions
})
export class UserController {
  @Get('user-list')
  getUserList() {
    return ['hello', 'world'];
  }
}
```

### Route version

A version can be applied to an individual route. (也可以给单独的路由设置版本, 路由版本会覆盖控制器的版本)

```ts
// xxx.controller.ts
import { Controller, Version, Get } from '@nestjs/common';
@Controller()
export class UserController {
  @Version('2')
  @Get('user-list')
  getUserList() {
    return ['hello', 'world'];
  }
}
```

### Multiple versions

Multiple versions can be applied to a controller or route.

```ts
// user.controller.ts
@Controller({
  version: ['1', '2'],
})
export class UserController {
  @Get('user-list')
  getUserList() {
    return ['hello', 'world'];
  }
}
```

## Header Versioning Type

Header Versioning uses a custom, user specified, request header to specify the version where the value
of the header will be the version to use for request.
(Header versioning 使用一个自定义,用户指定的头信息 来指定版本)

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Custom-Header',
  });
}
```

在设置了版本号的路由, 请求数据时 需在请求头设置对应的 版本号, 否则返回 404.

Some controllers or routes may not care about the version and would have the same functionality regardless
of the version. The version can be set to **VERSION_NEUTRAL** (有些控制器或者路由 可能不关心当前的版本, 可以设置版本为 VERSION_NEUTRAL)

```ts
import { VERSION_NEUTRAL } from '@nestjs/common'
@Version(VERSION_NEUTRAL)

@Controller({
  version: VERSION_NEUTRAL
})
```

## Media Type Versioning Type

Media Type Versioning uses the **Accept** header of the request to specify the version. Within the **Accept**
header, the version will be separated from the media type with a semi-colon **;**.

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.MEDIA_TYPE,
    key: 'v=', // 指定版本前缀和分隔符
  });
}
```

请求时设置请求头: **Accept: ;v=2**
