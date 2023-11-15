import { MenuService } from './menu.service'
import { Controller, Get } from '@nestjs/common'

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}
  @Get('menu_list')
  getMenuList () {
    return this.menuService.getMenuList()
  }
}