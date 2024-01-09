import { Controller, Get } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheKey } from '@nestjs/cache-manager';

@Controller('cache')
export class CacheController {
  constructor(private cacheService: CacheService) {}
  @Get('player-list')
  getPlayerList() {
    return this.cacheService.getPlayerList();
  }
  @CacheKey('count')
  @Get('times')
  getCount() {
    return this.cacheService.getCount();
  }
}
