# Events

Event Emitter package (**@nestjs/event-emitter**) provides a simple observer implementation, allowing
you to subscribe and listen for various events that occur in your application.
(@netjs/event-emitter 包 提供了一个简单的观察者对象实现, 允许你订阅和监听不同的事件。)

```ts
// usage
import { EventEmitterModule } from '@nestjs/event-emitter'
@Module({
  // The .forRoot() call initializes the event emitter and registers any declarative event listeners
  imports: [EventEmitterModule.forRoot({
    delimiter: '.', // 分隔符
    maxListeners: 10, // 最大可以监听事件的数量
  })]
})
```

## Dispatch Event

To dispatch an event, first inject **EventEmitter2** using standard constructor injection

```ts
import { EventEmitter2 } from '@nestjs/event-emitter';
export class CatController {
  constructor(private eventEmitter: EventEmitter2) {
    // 触发一个事件
    this.eventEmitter.emit('order.created', { message: 'hello world' });
  }
}
```

## Listening to Events

Use the **@OnEvent()** decorator.

```ts
import { OnEvent } from '@nestjs/event-emitter';

export class CatController {
  @OnEvent('order.created')
  handleOrderCreatedEvent(payload: any) {
    console.log('payload:', payload); // 接受 emit 触发事件时传递过来的数据
  }
}
```

**OnEvent()** 装饰器接受第二个可选参数。

```ts
{
  prependListener?: boolean,  // instead of append the given listener to the array of listeners.
  async: true //invoke the listener in async mode using setImmediate
  nextTick: true  // use process.nextTick instead of setImmediate to invoke the listener asynchronously.
  promisify: false  // additionally wraps the listener to a Promise for later invocation using emitAsync.
}
```

```ts
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
@Controller()
export class CatController {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  @Get('event-emitter')
  handleEventEmitter() {
    this.eventEmitter.emit('order.create', 'hello world');
    console.log('你好生活');
  }
  @OnEvent('order.create', { async: true })
  handleOrderCreated(payload: string) {
    console.log(payload);
  }
}
```

以上代码执行时 先输出 **你好生活**, 然后再输出 **hello world**, 因为 @OnEvent() 装饰器设置了 { async: true }. 异步方式执行
