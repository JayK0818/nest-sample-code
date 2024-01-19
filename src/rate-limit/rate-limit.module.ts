import { Module } from '@nestjs/common';
import { RateLimitingController } from './rate-limit.controller';

@Module({
  controllers: [RateLimitingController],
})
export class RateLimitingModule {}
