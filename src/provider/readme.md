# Providers

  The main idea of a provider is that it can be **injected** as a dependency.
  **Controllers** should handle HTTP requests and delegate more complex tasks to **providers**. Providers are plain JavaScript classes
  that are declared as **providers** in a **module**

  (控制器接收HTTP请求并且将更复杂的任务交个providers处理)

## Services

  以下是官网的一个列子
```ts
// cats.service.ts
/**
 * This service will be responsible for data storage and retrieval (用来数据存储和检索)
*/
import { Injectable } from '@nestjs/common'
@Injectable()
export class CatsService {
  findAll (): string {
    return ['hello', 'world']
  }
}

// cats.controller.ts
import { Controller, Get } from '@nestjs/common'
import { CatsService } from './cats.service'
@Controller('cats')
export class CatsController {
  /**
   * the private syntax allows us to both declare and initialize the catsService (同时声明和初始化catsService)
  */
  constructor(private readonly catsService: CatsService) {}
  @Get('list')
  getCatsList () {
    return this.catsService.findAll()
  }
}

// cats.module.ts
import { Module } from '@nestjs/common'
@Module({
  controllers: [CatsController],
  providers: [CatsService]
})

export class CatsModule {}
```