# Task Schedule

Task scheduling allows you to schedule arbitrary code to execute at a fixed date/time, at recurring
intervals, or once after a specified interval.
(定时任务允许你 按照指定的时间间隔/时间或者日期 或者 指定的间隔之后 来指定任务代码)

```ts
// usage
npm install --save @nestjs/schedule

// app.module.ts
import { ScheduleModule } from '@nestjs/schedule'
@Module({
  imports: [
    ScheduleModule.forRoot()
  ]
})
```

## Declarative cron jobs

显式地定义一个 计时任务 使用装饰器 **@Cron()**, 以下为一个 demo

```ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  @Cron('45 * * * * *')
  handleCron() {
    this.logger.log('hello world'); // 当45s的时候执行
  }
}
```

The **handleCron()** method will be called each time the current second is **45**.
Cron() 装饰器支持 星号, 范围 和 步。

```js
* * * * * *
| | | | | |
| | | | | day of week
| | | | months
| | | day of month
| | hours
| minutes
seconds (optional)
```

对于以上方式 可能难以记忆, Cron 也提供了一些 枚举变量以供使用。

```ts
import { CronExpression, Cron } from '@nestjs/schedule';
@Injectable()
export class TaskService {
  @Cron(CronExpression.EVERY_SECOND) // 每秒钟执行一次
  handleCron() {
    console.log('hello world');
  }
}
```

CronExpression 定义了很多方便的 枚举类型。 EVERY_30_SECONDS, EVERY_10_MINUTES, EVERY_1ST_DAY_OF_MONTH_AT_NOON 等等。

@Cron() 可以传递第二个可选的参数。

1. name: useful to access and control a cron job after it's been declared.
2. timeZone: specify the timezone for the execution.

To access a declarative cron job via the API, you must associate the job with a name by passing the **name**
property in an optional options object as the second argument of the decorator.
(为了能够控制显示声明的定时任务, 你必须给任务传递第二个可选的参数， 传递一个 name 属性)

## Declarative intervals

Use the **@Interval()** decorator. pass the interval value, as a number in milliseconds.

```ts
@Interval(1000)
handleInterval() {
  console.log('every second')
}
```

This mechanism use the JavaScript **setInterval()** function under the hood.

## Declarative timeouts

To declare that a method should run at a specified timeout, prefix the method definition with the
**@Timeout()** decorator.

```ts
import { Timeout } from '@nestjs/schedule'
@Timeout(5000)
handleTimeout() {
  console.log('console after 5 seconds')
}
```

This mechanism uses the JavaScript setTimeout() function under the hood.

If you want to control your declarative timeout function outside the declaring class via the **Dynamic API**,
associate the timeout or interval, using the following construction:

```ts
import { Interval, Timeout } from '@nestjs/schedule';

@Timeout('notification', 1000)
handleTimeout() {
  console.log('control the timeout')
}

@Interval('notification', 2000)
handleInterval() {
  console.log('control the interval')
}
```

## Dynamic cron jobs

Obtain a reference to a **CronJob** by name from anywhere in your code using the **SchedulerRegistry** API
(为了通过 名称获得 定时任务的引用, 使用 SchedulerRegistry).

```ts
import { SchedulerRegistry, Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class TaskService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  @Cron(CronExpression.EVERY_SECOND, {
    name: 'notifications',
  })
  handleCron() {
    const job = this.schedulerRegistry.getCronJob('notifications');
    job.lastDate();
    job.stop();
    // console.log(this.schedulerRegistry.getCronJob('notifications'));
  }
}
```

1. stop(): 停止一个定时任务
2. start(): 重新开始
3. setTime(): stops a job, sets a new time for it, and then starts it
4. lastDate(): returns a string representation of the last date a job executed.
5. nextDates(count: number) returns an array of **moment** objecta representing upcoming job execution dates.
