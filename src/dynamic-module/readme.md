# Dynamic Module

Dynamic modules give us the ability to pass parameters into the module being imported so we can change its
behavior. (动态模块允许我们给 module 传递参数 这样我们可以改变它的行为。)

```ts
@Module({
  // ConfigureModule has a static method called register().
  // 静态方法可以叫任何其他名字, 为了方便起见 我们定义为 forRoot() / register()
  imports: [ConfiguModule.register({
    folder: './config'
  })],
  controllers: [AppController],
  providers: [AppService]
})
```

A dynamic module is nothing more than a module created at run-time. with the same exact properties
as a static module, plus one additional property called **module**.
(动态 module 是一个运行时创建的 module, 和静态 module 有着相同的模块，附加一个额外的 module 属性).

The **module** property serves as the name of the module, and should be the same as the class name of the module.

```ts
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
@Module({})
export class ConfigModule {
  static register(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
```

```ts
// 一个Demo (在service中怎么获取到 参数)

// config.module.ts
@Module({})
export class ConfigModule {
  // register 方法: You are expecting to configure a dynamic module with a specific configuration for use
  // only by the calling module.
  static register(opts): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: opts,
        },
        ConfigService,
      ],
    };
  }
}

// config.service.ts
@Injectable()
export class ConfigService {
  contructor(@Inject('CONFIG_OPTIONS') private opts: Record<string, any>) {}
}
```
