import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  private playerList: string[] = [];
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.playerList = ['kyrie'];
    this.addPlayerToList();
  }
  async getPlayerList() {
    const list = await this.cacheManager.get('player');
    if (!list) {
      await this.cacheManager.set('player', this.playerList);
      return this.playerList;
    }
    return list;
  }
  addPlayerToList() {
    setTimeout(() => {
      this.playerList.push('lebron');
    }, 2000);
  }
}
