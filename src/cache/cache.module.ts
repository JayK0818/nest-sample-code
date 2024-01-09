import { Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { CacheModule as a } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';

@Module({
  controllers: [CacheController],
  providers: [CacheService],
  imports: [
    a.register({
      isGlobal: true,
    }),
  ],
})
export class CacheModule {}
