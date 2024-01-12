import { Injectable, Logger } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  Interval,
  Timeout,
  SchedulerRegistry,
} from '@nestjs/schedule';

@Injectable()
export class TaskScheduleService {
  private readonly logger = new Logger(TaskScheduleService.name);
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  @Cron('45 * * * * *')
  handleCron() {
    this.logger.log('hello world');
  }
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON)
  @Cron(CronExpression.EVERY_SECOND)
  handleStart() {
    this.logger.log('start');
  }
  @Interval(1000)
  handleInterval() {
    console.log('every second');
  }
  @Timeout(5000)
  handleTimeout() {
    console.log('console after 5 seconds');
  }
  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'every_5_seconds',
  })
  handleFiveSecond() {
    // console.log(this.schedulerRegistry.getCronJob('every_5_seconds'));
    const job = this.schedulerRegistry.getCronJob('every_5_seconds');
    console.log(job.lastDate());
    // job.stop();
    console.log(job.nextDates(10));
  }
}
