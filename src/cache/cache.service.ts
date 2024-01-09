import { Get, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  private playerList: string[] = [];
  private count: number;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.playerList = ['kyrie'];
    this.count = 0;
    this.addPlayerToList();
    setInterval(() => {
      this.count += 1;
    }, 1000);
  }
  @CacheTTL(5000)
  async getPlayerList() {
    /*     const list = await this.cacheManager.get('player');
    if (!list) {
      await this.cacheManager.set('player', this.playerList);
      return this.playerList;
    }
    return list; */
    // 全局 cache
    // return this.playerList;
    // 覆盖cache_keyx
    const list = await this.cacheManager.get('player');
    if (!list) {
      await this.cacheManager.set('player', this.playerList);
      return this.playerList;
    }
    return list;
  }
  async getCount() {
    this.cacheManager.set('a', 123);
    const r = await this.cacheManager.store.mget();
    console.log(r); // []
    const s = await this.cacheManager.store.keys();
    console.log(s); // []
    const c = await this.cacheManager.get('count');
    console.log('c', c);
    return this.count;
  }
  addPlayerToList() {
    setTimeout(() => {
      this.playerList.push('lebron');
    }, 4000);
  }
}
