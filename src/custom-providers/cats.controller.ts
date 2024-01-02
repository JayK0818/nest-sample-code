import { Controller, Get } from '@nestjs/common';
import { CustomProviderCatService } from './cats.service';

@Controller('custom-providers')
export class CustomProviderController {
  constructor(private catService: CustomProviderCatService) {}
  @Get('player-list')
  getPlayerList() {
    console.log('请求了吗?');
    return this.catService.getPlayerList();
  }
  @Get('team-list')
  getTeamList() {
    return this.catService.getTeamList();
  }
}
