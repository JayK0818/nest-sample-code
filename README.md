# Nestjs

## @nestjs/config

In Node.js applications, it is common to use **.env** files, holding key-value pairs where each key presents a
particular value, to present each environment. Running an app in different envirionments is then just a matter
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
2. A custom **validate()** function which takes environment variables as an input

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
