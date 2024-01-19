import { Controller, Get } from '@nestjs/common';
import { Throttle, seconds } from '@nestjs/throttler';

@Throttle({ default: { ttl: seconds(20), limit: 3 } })
@Controller('rate-limiting')
export class RateLimitingController {
  @Get('player-list')
  getPlayerList() {
    console.log('执行了吗');
    return ['kyrie', 'durant'];
  }
  @Get('message')
  getMessage() {
    return 'hello world';
  }
}
