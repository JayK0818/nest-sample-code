import { Controller, Get } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Controller('/logger')
export class LoggerController {
  constructor(private readonly logger: Logger) {}
  @Get('logger-list')
  getLoggerList() {
    return ['pino', 'wiston'];
  }
}
