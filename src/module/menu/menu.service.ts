import { Injectable } from '@nestjs/common'

@Injectable()
export class MenuService {
  private readonly menu_list: string[] = ['Controllers', 'Providers', 'Modules']
  getMenuList () {
    return this.menu_list
  }
}