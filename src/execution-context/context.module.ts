import { Module } from '@nestjs/common';
import { ExecutionContextController } from './context.controller';

@Module({
  controllers: [ExecutionContextController],
})
export class ExecutionContextModule {}
