import { Controller, Get, Inject, UnauthorizedException } from '@nestjs/common';
// import { Logger } from 'nestjs-pino';
import { LoggerService } from './logger.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('/logger')
export class LoggerController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly loggerService: LoggerService,
  ) {}
  @Get('logger-list')
  getLoggerList() {
    return ['pino', 'wiston'];
  }
  @Get('type-list')
  getLoggerTypeList() {
    throw new UnauthorizedException();
    return this.loggerService.getLogTypeList();
  }
}
