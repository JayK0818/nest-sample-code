# Model-View-Controller

In order to create an MVC app, we also need a **template engine** to render our HTML views

```js
npm install --save hbs
```

```ts
// 设置模版引擎 / 静态资源路径
async function bootstrap() {
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // 设置模版引擎
  app.setViewEngine('hbs');
}
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>App</title>
  </head>
  <body>
    {{ message }}
  </body>
</html>
```

```ts
// xxx.controller.ts
@Controller()
export class UserController {
  @Get()
  @Render('index')
  root() {
    return { message: 'hello world' }; // 将数据输入到页面
  }
}
```

注意在 hbs 文件中引入 静态资源文件时, 路径不需要加 public
