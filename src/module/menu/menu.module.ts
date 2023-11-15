import { Module, Global } from '@nestjs/common'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'

@Global()
@Module({
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService]
})

export class MenuModule {}