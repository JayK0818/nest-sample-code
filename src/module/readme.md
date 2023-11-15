# Modules

  A Module is a class annotated with a **@Module()** decorator. Each application has at least one module, a **root module**
  (每个应用程序至少有一个模块 根模块)

  The **Module()** decorator takes a single object whose properties describe the module:
  (Module装饰器接收一个对象, 对象包含以下参数:)
1. providers
2. controllers
3. imports  (the list of imported modules that export the providers which are required in this module)
  导入的modules列表. 被导入的module中导出了providers. 而当前module中使用了公用的providers
4. exports (provides by this module and should be available in other modules which import this module) 共享providers

  The Module encapsulates providers by default, This means that it is impossible to inject providers that are neither directly part of the
  current module nor exported from the imported modules. 

## Shared modules

  Modules are **singletons** by default, and you can share the same instance of any provider between multiple modules.
  (modules默认为单例模式, 你可以在不同的modules使用同一个实例)

  以下为一个demo (部分代码省略...)
```ts
// menu.service.ts
@Injectable()
export class MenuService {
  private readonly menu_list: string[] = ['Controllers', 'Providers', 'Modules']
  getMenuList () {
    return this.menu_list
  }
}

// menu.controller.ts
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}
  @Get('menu_list')
  getMenuList () {
    return this.menuService.getMenuList()
  }
}

// menu.module.ts
@Module({
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService] // first need to export the MenuService provider
})


// 然后在其他地方使用这个menuService 只需要导入 MenuModule 即可.
// another.module.ts
@Module({
  imports: [MenuModule]
})
// another.controller.ts
@Controller()
export class AnotherModule {
  constructor(private menuService: MenuService) {}
  @Get()
  getMenuList () {
    return this.menuService.getMenuList()
  }
}
```

## Global modules

  When you want to provide a set of providers which should be available everywhere out-of-the-box, make the module **global** with
  the **@Global()**
  (如果需要在很多地方都使用相同的providers, 可以使用让它变成 全局下的 module)

  Nest encapsulates providers inside the module scope. You aren't able to use a module's providers elsewhere without first importing the encapsulating module

```ts
// usage
// menu.module.ts
@Global() // The @Global() decorator makes the module global-scoped
@Module({
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService]
})

// app.module.ts
import { MenuModule } from './menu.module.ts'
@Module({
  imports: [MenuModule]
})
```
  然后在其他地方使用 **MenuService** 时 无需在 xxx.module.ts 的imports选项中引入 **MenuModule**

*(Making everything global is not a good design decision.)全局Module可能不是一个好的决定. 虽然全局modules可以减少一定数量的样板代码, 通常来将使用 **imports** 引入module 对用户来说是一个更好的方式*