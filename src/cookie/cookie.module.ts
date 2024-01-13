import { Module } from '@nestjs/common';
import { CookieController } from './cookie.controller';

@Module({
  controllers: [CookieController],
})
export class CookieModule {}
