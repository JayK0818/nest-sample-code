<!-- TOC -->autoauto- [1. Nestjs](#1-nestjs)auto  - [1.1. @nestjs/config](#11-nestjsconfig)auto    - [1.1.1. ConfigModule](#111-configmodule)auto    - [1.1.2. ConfigService](#112-configservice)auto    - [1.1.3. Custom env file path](#113-custom-env-file-path)auto    - [1.1.4. Custom configuration files](#114-custom-configuration-files)auto    - [1.1.5. Configuration namespaces](#115-configuration-namespaces)auto    - [1.1.6. Schema validation](#116-schema-validation)auto    - [1.1.7. Conditional module configuration](#117-conditional-module-configuration)auto  - [1.2. dotenv](#12-dotenv)auto    - [1.2.1. Config](#121-config)auto    - [1.2.2. Parsing](#122-parsing)auto  - [1.3. Rxjs](#13-rxjs)auto  - [1.4. Observable](#14-observable)auto    - [1.4.1. Pull and Push](#141-pull-and-push)auto    - [1.4.2. Disposing Observable Executions](#142-disposing-observable-executions)autoauto<!-- /TOC -->

# Nestjs

## @nestjs/config

In Node.js applications, it is common to use **.env** files, holding key-value pairs where each key presents a
particular value, to present each environment. Running an app in different environments is then just a matter
of swapping in the correct **.env** file.

```js
npm install @nestjs/config --save
```

@nestjs/config 在内部使用了 dotenv.

### ConfigModule

```ts
import { ConfiguModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```

The above code will load and parse **.env** file from the default location(the project root directory), merge
key/value pairs the **.env** file with environment variables assigned to **process.env**
(上述代码 将会从项目根目录中加载并解析 .env 文件, 将环境变量分配到 process.env 对象上。)

The **forRoot()** method registers the **ConfigService** provider, which provides a **get()** method for
reading these parse/merged configuration variables.
(forRoot()方法会注册 ConfigService 服务, 该服务提供一个 get() 方法用于读取 解析的 环境变量)。

```ts
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true // 忽略 .env file文件。
      envFilePath: '.development.env', // (默认从根目录中查找.env文件, 也可以手动指定)
      envFilePath: ['.env.development.local', 'env.development'],
      isGlobal: true,  // 设置为全局module. (you will not need to import ConfigModule in other modules)
      cache: true // 缓存
    })
  ]
})
```

When a key exists both in the runtime environment as an environment variable and in a **.env**
file, the runtime environment variable takes precedence
(如果同一个环境变量同时存在.env 文件和运行环境中, 那么 运行时的环境变量 优先)

### ConfigService

To access configuration values from our **ConfigService**, we first need to inject **ConfigService**. As with any provider, we need to import its containing module - the **ConfigModule** - into the module that will use it
(为了从 configService 中获取配置的变量, 我们需要注入 ConfigService. 在 ConfigModule 中引入 ConfigService。)

```ts
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ConfigurationService {
  constructor(configService: ConfigService) {}
  getUser() {
    /**
     * use the configService.get() method to get a simple environment variable by passing the variable name
     * (获取某个值, 通过给configService.get()方法中传递指定的变量名)。
     */
    const user = this.configService.get<string>('DATABASE_USER');
    return user;
  }
}
```

```ts
// get()的第二个参数是一个默认值
const host = this.configService.get<string>('database.host', 'localhost');
```

### Custom env file path

默认查找根目录下的 **.env** 文件, 也可以给 forRoot() 方法传递一个对象, 设置 **envFilePath** 指定读取的文件

```ts
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env'
      // 指定多个 .env 文件
      envFilePath: ['.development.env', '.env']
      // 哪个在前 哪个生效
    })
  ]
})
```

### Custom configuration files

For more complex projects, you may utilize custom configuration files to return nested configuration objects.
This allows you to group related configuration settings by function.
(一些复杂的项目, 可能需要定制配置文件 返回一个嵌套的配置文件, 允许你通过函数组织一些相关的配置)。

```ts
// config/configuration.ts
export default () => ({
  database: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  message: 'hello world',
});
```

```ts
import { Injectable, ConfigService } from '@nestjs/config';
@Injectable()
export class ConfigurationService {
  constructor(configService: ConfigService) {}
  getDatabaseConfig() {
    return this.configService.get<{ username: string; password: string }>(
      'database',
    );
  }
}
```

### Configuration namespaces

The **ConfigModule** allows you to define and load multiple custom configuration files. You can manage
complex configuration object hierarchies with nested configuration objects.
(ConfigModule 允许你定义多个使用命名空间的配置文件)

```ts
// config/database
import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
  host: process.env.DATABASE_USERNAME,
  port: process.env.DATABASE_PORT || 3000,
}));

// config/user
import { registerAs } from '@nestjs/config';
export default registerAs('user', () => ({
  firstName: 'kyrie',
  lastName: 'irving',
}));

// configuration.module.ts
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import databaseConfig from './config/database.config'
import userConfig from './config/user.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, userConfig]
    })
  ]
})

// configuration.service.ts
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class ConfigurationService {
  constructor(configService: ConfigService) {}
  getConfigObject() {
    const database = this.configService.get('database')
    console.log('database:', database)
    const user = this.configService.get('user')
    console.log('user:', user)
  }
}
```

### Schema validation

环境变量验证 The **@nestjs/config** package enables two different ways to do this:

1. Joi built-in validator

```ts
// usage
// 下载 Joi
npm install joi --save

// configuration.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
          // 如果.env文件没有 在项目启动的时候就会报错
/**
 * It is standard practice throw an exception during application startup if required environment variables
 * have not been provided.
*/
        DATABASE: Joi.string().required()
      }),
      validationOptions: {
        allowUnknown: false // 是否允许.env文件中存在   不在 schema 中定义的变量
      }
    })
  ]
})
```

By default, unknown environment variables are allowed and do not trigger a validation exception.

2. A custom **validate()** function which takes environment variables as an input

You can specify a **synchronous** **validate** function that takes an object containing the environment variables
and returns ann object containing validated environment variables so that you can convert/mutate
them if need
(你可以指定一个同步的 validate 函数 接收一个对象包含环境变量 并且返回一个对象包含 验证的环境变量 这样你可以转换/修改)

```ts
// .env.validation.ts
// 以下代码来自官网
import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNumber, validateSync } from 'class-validator'

enum Environment {
  Development = 'development'
  Production = 'production',
  Test = 'test',
  Provision = 'provision'
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNumber()
  PORT: number;
}

// 一个验证函数
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true }
  )
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })
  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}

// configuration.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from './env.validation'
@Module({
  imports: [
    ConfigModule.forRoot({
      validate
    })
  ]
})
```

### Conditional module configuration

There may be times where you want to conditionally load in a module and specify the condition in an
env variable.
(可能需要根据条件判断来加载模块 并在 env 文件中 指定条件)

```ts
@Module({
  imports: [ConfigModule.forRoot(), ConditionalModule.registerWhen(FooModule, 'USE_FOO')]
  /**
   * 当.env文件中 变量USE_FOO为 true时 加载 FooModule 模块。
  */
})
```

也可以传递一个函数 自定义判断条件。该函数接受 **process.env** 对象的引用, 并返回一个布尔值。

## dotenv

Dotenv is a zero-dependency module that loads environment variables for a **.env** file in to **process.env**.

Create a **.env** file in the root of your project:

### Config

**config** will read your **.env** file, parse the contents, assign it to the **process.env**, and return an object
with a parsed key containing the loaded content.
(config 方法将会读取.env 后缀文件内容, 将内容以键值对的形式分配到 process.env 对象上 并返回一个 object.)

```js
// usage

SECRET = 'HELLO WORLD';

import 'dotenv/config';
// require('dotenv').config()

console.log(process.env);

/**
 * {
 *    SECRET: 'hello world',
      PASSWORD: '你好生活' 
 * }
*/
```

### Parsing

It accepts a String or Buffer and will return an Object with the parsed keys and values.

```js
import * as dotenv from 'dotenv';

const buffer = Buffer.from('BASIC=basic');
const config = dotenv.parse(buffer);
console.log(config, typeof config);
/**
 * { BASIC: 'basic' } object
 */
```

## Rxjs

Rxjs is a library for composing asynchronous and event-based programs by using observable sequences.

## Observable

Observables are lazy push collections of multiple values (可观测对象是多个值的延迟集合)

```ts
// 一个demo
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next(v) {
    console.log('got value:', x);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');

/**
 * 执行顺序为
* just before subscribe
    got value: 1
    got value: 2
    got value: 3
    just after subscribe
    got value: 4
    done
*/
```

### Pull and Push

In **Pull** systems, the Consumer determines when it receives data from the data Producer. The Producer itself is unaware of when the
data will be delivered to the Consumer.

In **Push** systems, the Producer determines when to send data to the Consumer. The Consumer is unaware of when it will receive that data.

An Observable is a **Producer** of multiple values, _pushing_ then to Observers (Consumers).

Observables are able to deliver values either synchronously or asynchronously
(Observable 可以同步 也可以异步传递值)

What is the difference between an Observable and a function? (Observable 和 函数的区别是什么?)
Observables can return multiple values over time, Functions can only return one value (Observables 可以返回多个值, 然而函数只能返回一个值)

```js
import { Observable } from 'rxjs';
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
});
observable.subscribe((x) => {
  console.log(x); // 1 2
});
```

1. Create

Observable can be created with **new Observable**, Most commonly, observables are created using creation functions, like _of_, _from_...

```ts
// Observable execution
const observable = new Observable(function subscribe(subscriber) {
  setInterval(() => {
    subscriber.next('hi');
  });
});
```

2. Subscribing to Observables

When calling **observable.subscribe** with an Observer, the function **subscribe** in **new Observable(function subscribe(subscriber){...})**
is run for that given subscriber.

```ts
observable.subscribe((x) => {
  console.log(x); // 每隔1秒 输出 hi
});
```

3. Execution Observables

```ts
const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4); // Is not delivered
});
```

### Disposing Observable Executions

We need an API for canceling an execution. (需要一个 API 用来取消 observable 的执行)

```ts
/**
 * the subscription represents the ongoing execution. and has a minimal API which allows you to cancel that execution
 * (subscription 代表当前正在执行的程序, 返回一个mini的API 允许用来取消执行)
 * */
const subscription = observable.subscribe((x) => {
  console.log(x);
});
// subscription.unsubscribe()
```

```ts
// 一个demo
const observable = new Observable(function subscribe(subscriber) {
  setInterval(() => {
    subscriber.next(1);
  }, 1000);
});

const subscription1 = observable.subscribe(function (x) {
  console.log(x);
});
const subscription2 = observable.subscribe((x) => {
  console.log(x);
});

// 2s后 第二个observable内的函数还在执行
setTimeout(() => {
  subscription1.unsubscribe();
}, 2000);
```

## Observer

An Observer is a consumer of values delivered by an Observable. Observers are simply a set of callbacks.

```ts
const observer = {
  next: (x) => console.log('observer got a next value:', x),
  error: (err) => console.log(err),
  complete: () => console.log('completed'),
};

// demo
(function () {
  function subscribe(subscriber) {
    const id = setInterval(() => {
      subscriber.next('原生js');
    }, 1200);
    return function ubsubscribe() {
      window.clearInterval(id);
    };
  }
  const unsubscribe = subscribe({ next: (x) => console.log(x) });
  unsubscribe();
})();
```

To use the Observer, provide it to the subscribe of an Observable. (使用 observer, 将它传递给 subscribe 函数)。

## Operators

Operators are functions.

1. **Pipeable Operators**
   用法 observableInstance.pipe(operator) / observableInstance.pipe(operatorFactory())
   A pipeable Operator is essentially a pure function which takes one Observable as input and generates another
   Observable as output.
   (管道操作符是一个纯函数,接受一个 observable 作为参数 并且生成另一个 observable 作为输出)。

   A Pipeable Operator Factory is a function that can take parameters to set the context and return a Pipeable
   Operator.

2. **Creation Operators**

Creation operators are functions that can be used to create an Observable with some common predefined behavior or by joining other Observables

2.1 from: Creates an Observable from an Array, an array-like object, a Promise, an iterable object...

```ts
// demo

// array
const array_from = from([1, 2, 3]);
array_from.subscribe((x) => {
  console.log('array:', x); // 1, 2, 3
});

// array-like object
const object_from = from({
  0: 'hello',
  1: 'world',
  2: 'hello world',
  length: 3,
});
object_from.subscribe((x) => {
  console.log('object:', x); // hello, world, hello world
});

// 类数组
function foo(a: number, b: number): void {
  console.log(a, b);
  const arguments_from = from(arguments);
  arguments_from.subscribe((x) => {
    console.log('argument:', x); // 1 2
  });
}
foo(1, 2);

// 字符串
from('hello').subscribe({
  next: (v) => {
    console.log('string:', v);
    // h, e, l, l, o
  },
});
```

2.2 interval: Create an Observable that emits sequential numbers every specified interval of time.

```ts
import { take, interval } from 'rxjs';

const numbers = interval(1000);
numbers.pipe(take(4)).subscribe((x) => {
  console.log('interval:', x); // 0,1,2,3
});
```

2.3 of: Converts the arguments to an observable sequence.

```ts
of(10, 20, 30).subscribe({
  next: (v) => {
    console.log('off-v:', v); // 10, 20, 30
  },
  complete: () => {
    console.log('off-complete:');
  },
});

of(['hello', 'world', 'hello world']).subscribe({
  next: (v) => {
    console.log('of-array:', v); // [ 'hello', 'world', 'hello world' ]
  },
  complete: () => {
    console.log('complete');
  },
});

of({ 0: '你好', 1: '生活', length: 2 }).subscribe({
  next: (v) => {
    console.log('of-object:', v);
  },
  complete: () => {
    console.log('of-object-complete');
    // { '0': '你好', '1': '生活', length: 2 }
  },
});
```

2.4 range: Creates an Observable that emits a sequence of numbers within a specified range.

```ts
range(10, 5).subscribe({
  next: (v) => {
    console.log('range:', v);
    // 10 11 12 13 14
  },
});
```
