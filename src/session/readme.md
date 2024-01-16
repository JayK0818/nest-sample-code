# Session

**HTTP sessions** provide a way to store information about the user across multiple requests.

## Usage

```ts
npm install express-session
npm install -D @types/express-session
```

Session data is not stored in the cookie itself, just the session ID. Session data is stored server-side.

```ts
// app.ts
import * as session from 'express-session';

app.use(
  session({
    secret: 'secret',
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      path: '/',
      // ... 设置cookie的选项
    },
  }),
);
```

### secret

**secret** is used to sign the session ID cookie。 This can be either a string for a single secret,
or an array of multiple secrets. If an array of secrets is provided, only the first element will be used to
sign the session ID cookie.
(secret 用来设置签名 cookie, 可以是字符串 或者 一个数组, 如果设置一个数组, 只有数组中的第一个元素会被使用)

### rolling

Force the session identifier cookie to be set on every response.The expiration is reset to the
original **maxAge**, resetting the expiration countdown.
(过期时间重新设置为 maxAge 设置的时长)
