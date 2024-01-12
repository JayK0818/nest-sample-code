import { Controller, Get } from '@nestjs/common';
import { TaskScheduleService } from './task.service';

@Controller('task-schedule')
export class TaskScheduleController {
  constructor(private taskService: TaskScheduleService) {}
}
