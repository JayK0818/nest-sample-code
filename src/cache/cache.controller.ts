import { Controller, Get } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private cacheService: CacheService) {}
  @Get('player-list')
  getPlayerList() {
    return this.cacheService.getPlayerList();
  }
}
