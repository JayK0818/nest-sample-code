import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { join } from 'path';

@Module({
  controllers: [LoggerController],
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          // target: 'pino-pretty',
          target: 'pino-roll',
          options: {
            frequency: 'daily',
            file: join('logs', 'user'),
            mkdir: true,
            extension: 'json',
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
