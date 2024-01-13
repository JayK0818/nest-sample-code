# Cookie

An **HTTP cookie** is a small piece of data stored by the user's browser. When the user visits the website
again, the cookie is automatically sent with the request.

## Usage

```js
npm install cookie-parser --save
npm install @types/cookie-parser

// usage
import * as cookieParser from 'cookie-parser'
app.use(cookieParser())
```

该中间件接受部分参数

1. secret: a string or array used for signing cookies. If a string is provider, this is used as the secret.
   if an array is provided, an attempt will be made to unsign the cookie with each secret in order.
   (可以传递一个字符串 或者数组, 如果是数组的话 将尝试按照顺序 解码 cookie.)
2. options: an object that is passed to **cookie.parse** as the second option.

The middleware will parse the **Cookie** header on the request and expose the cookie data as the property
**req.cookies**. If a secret was provided, as property **req.signedCookies**

A signed cookie is a cookie that has a value prefixed with **s:**

以下为一个 demo

```ts
import { Req, Res, Controller } from '@nestjs/common';
import { Request, Response } from 'express';
@Controller()
export class PlayerController {
  @Post('login')
  handleLogin(@Res({ passthroung: true }) response: Response) {
    response.cookie('name', 'kyrie');
  }
  @Get('player-list')
  getPlayerList(@Req() request: Request) {
    console.log(request.cookies);
    // cookies: { name: 'kyrie' }
    return ['kyrie', 'durant'];
  }
}
```

以上 demo 先访问 **login** 路径 下发一个 cookie, 然后再访问 **player-list**, 成功解析下发的 cookies
