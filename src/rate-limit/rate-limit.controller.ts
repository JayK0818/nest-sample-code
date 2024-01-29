import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  Throttle,
  seconds,
  ThrottlerGuard,
  SkipThrottle,
} from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from './throttler-behind-proxy.guard';

@UseGuards(ThrottlerBehindProxyGuard)
// @Throttle({ default: { ttl: seconds(100), limit: 3 } })
@Controller('rate-limiting')
export class RateLimitingController {
  @Get('player-list')
  getPlayerList() {
    console.log('执行了吗');
    return ['kyrie', 'durant'];
  }
  @SkipThrottle()
  @Get('message')
  getMessage() {
    return 'hello world';
  }
}
