# Custom Providers

Dependency injection is an **inversion of control** technique wherein you delegate instantiation of dependencies to the IoC contaoner.

什么时候使用 custom providers.

1. You want to create a custom instance instead of having Nest instantiate a class
2. You want to re-use an existing class in a second dependency ()
3. You want to override a class with a mock version for testing (使用 mock service)

```ts
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

/**
 * the @Injectable() decorator declares the CatsService class as a class that can be managed by the Nest IoC container
 */
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}

@Module({
  providers: [CatsService],
  // 以上是一个语法糖
  providers: [
    {
      provide: CatsService,
      useClass: CatsService
    }
  ]
})
```

## Value providers: useValue

```ts
/**
 * a literal object that has the same interface as the CatsService class it is replacing.
*/
const mockCatsService = {
  /**
   * 和 CatsService 中定义相同的方法名. 返回值将使用 mockService中的返回值
  */
  getList () {
    return ['a', 'b', 'c']
  }
}

@Module({
  providers: [
    {
      provide: CatsService,
      useValue: mockCatsService
    }
  ]
})
```

## useClass

The **useClass** syntax allows you to dynamically determine a class that a token should resolve to.
(useClass 语法允许你动态的使用哪个服务)。

```ts
@Module({
  providers: [
    {
      provide: ConfigService,
      useClass: process.env.NODE_ENV === 'development'
        ? DevelopmentConfigService
        : ProductionConfigService
    }
  ]
})
```

Nest will inject an instance of the provided class (**DevelopmentConfigService** or **ProductionConfigService**) overriding any default implementation that may have been declared elsewhere.
(Nest 将会根据情况注入一个 class 覆盖默认的实现)

如果访问的是 实际使用的类，而默认的类 上没有的方法, 那么将会报错。

## useFactory

The **useFactory** syntax allows for creating providers **dynamic**. The actual provider will be supplied by
the value returned from a factory function. (useFactory 语法允许你动态创建一个 provider。实际的 provider 将会通过 useFactory 函数 返回值提供。)

1. The factory function can accept (optional) arguments (可以接受 参数(可选的))
2. The (optional) **inject** property accepts an array of providers that Nest will resolve and pass as arguments to the
   factory function during the instantiation process.
   (可选的 inject 属性接受一个 providers 数组, nest 将会解析并传递 给 useFactory 函数 (参数顺序和传递给 inject 数组顺序一致))

```ts
@Module({
  providers: [
    DevelopmentCatService, // useFactory中使用的service 需要在此处注入
    {
      provide: CustomProviderCatService,
      useFactory(a) {
        console.log('a', a, a.getPlayerList());
        // 显式地返回一个实例 / 或者直接返回参数接受到的 provider
        return new CustomProviderCatService()
        return a
      },
      inject: [DevelopmentCatService],
    },
  ]
})
```

Asynchronous providers

```ts
@Module({
  providers: [
    {
      provide: 'ASYNC_CONNETION',
      useFactory: async () => {
        const connection = await createConnection(options)
        return connection
      }
    }
  ]
})
```
