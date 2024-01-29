import { Module } from '@nestjs/common';
import { RateLimitingController } from './rate-limit.controller';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        limit: 3,
        ttl: 1000 * 60,
      },
    ]),
  ],
  controllers: [RateLimitingController],
})
export class RateLimitingModule {}
