import { Module } from '@nestjs/common';
import { CustomDecoratorController } from './decorator.controller';

@Module({
  controllers: [CustomDecoratorController],
})
export class CustomDecoratorModule {}
