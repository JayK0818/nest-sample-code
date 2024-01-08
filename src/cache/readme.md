# Cache

Caching is a great and simple **technique** that helps improve your app's performance.

```ts
// installation
npm install @nestjs/cache-manager cache-manager

// usage
// xxx.module.ts
import { CacheModule } from '@nestjs/cache-manager'
@Module({
  imports: [CacheModule.register({
    ttl: 5, // 缓存时间默认5s
    max: 10,  // maximum number of items in cache
    isGlobal: true  // 全局缓存
  })],
  controllers: [AppController]
})

// xxx.service.ts
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){}
}
```

## get

The **get** method on the **Cache** instance is used to retrieve items from the cache

```ts
const value = await this.cacheManager.get('key');
```

```ts
await this.cacheManager.set('key', 'value');
// the default expiration time of the cache is 5seconds (默认过期时间是5秒)，可以手动指定交易一个过期时间
await this.cacheManager.set('key', 'value', 10000);

// To disable expiration of the cache, set 0
await this.cacheManager.set('key', 'value', 0);

// 删除
await this.cacheManager.del('key');
await this.cacheManager.reset();
```

```ts
// cache.service.ts
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
```

以上代码 在 2000ms 之前 请求返回 ['kyrie'], 2s 后 数值变为 ['kyrie', 'lebron'] 依然返回 ['kyrie'], 5s 后 返回 ['kyrie', 'lebron'], 因为默认过期时间为 5s, 此时缓存已过期，重新返回最新的数据 并添加至缓存。
