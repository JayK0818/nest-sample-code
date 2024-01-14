import { Module } from '@nestjs/common';
import { EventEmitterController } from './event-emitter.controller';

@Module({
  controllers: [EventEmitterController],
})
export class EventEmitterModule {}
