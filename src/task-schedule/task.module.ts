import { Module } from '@nestjs/common';
import { TaskScheduleController } from './task.controller';
import { TaskScheduleService } from './task.service';

@Module({
  controllers: [TaskScheduleController],
  providers: [TaskScheduleService],
})
export class TaskScheduleModule {}
