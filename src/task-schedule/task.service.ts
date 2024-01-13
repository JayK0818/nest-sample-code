import { Injectable, Logger } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  Interval,
  Timeout,
  SchedulerRegistry,
} from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
/* export class TaskScheduleService {
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
} */
export class TaskScheduleService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}
  // private readonly schedulerRegistry: SchedulerRegistry;
  addCronJob(name: string, seconds) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      console.log('hello dynamic cron');
    });
    this.schedulerRegistry.addCronJob(name, job as any);
    // job.start();
  }
  addIntervalJb(name: string, seconds: number) {
    const interval = setInterval(function () {
      console.log('hello interval');
    }, seconds * 1000);
    this.schedulerRegistry.addInterval(name, interval);
  }
  addTimeoutJob(name: string, seconds: number) {
    const timeout = setTimeout(function () {
      console.log('hello timeout');
    }, seconds * 1000);
    this.schedulerRegistry.addTimeout(name, timeout);
  }
  @Timeout(5000)
  dynamicAddCron() {
    /*     this.addCronJob('dynamic', 2);
    console.log(this.schedulerRegistry.getCronJobs()); */
  }
  @Timeout(5000)
  dynamicAddInterval() {
    // this.addIntervalJb('interval_job', 2);
  }
  @Timeout(8000)
  clearInterval() {
    this.schedulerRegistry.deleteInterval('interval_job');
  }
  @Timeout(3000)
  addTimeoutCron() {
    this.addTimeoutJob('timeout', 2);
  }
}
