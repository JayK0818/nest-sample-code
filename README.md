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
  providers: [
    ConfigModule.forRoot({
      ignoreEnvFile: true // 忽略 .env file文件。
      envFilePath: '.development.env', // (默认从根目录中查找.env文件, 也可以手动指定)
      envFilePath: ['.env.development.local', 'env.development'],
      isGlobal: true
    })
  ]
})
```

### ConfigService

```ts
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ConfigurationService {
  constructor(configService: ConfigService) {}
  getUser() {
    const user = this.configService.get<string>('DATABASE_USER');
    return user;
  }
}
```

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
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 1000)
})

console.log('just before subscribe')
observable.subscribe({
  next(v) {
    console.log('got value:', x)
  },
  complete() {
    console.log('done')
  }
})
console.log('just after subscribe')

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

  An Observable is a **Producer** of multiple values, *pushing* then to Observers (Consumers).

  Observables are able to deliver values either synchronously or asynchronously
  (Observable 可以同步 也可以异步传递值)

  What is the difference between an Observable and a function? (Observable 和 函数的区别是什么?)
  Observables can return multiple values over time, Functions can only return one value (Observables 可以返回多个值, 然而函数只能返回一个值)

```js
import { Observable } from 'rxjs'
const observable = new Observable((subscriber) => {
  subscriber.next(1)
  subscriber.next(2)
})
observable.subscribe(x => {
  console.log(x)  // 1 2
})
```