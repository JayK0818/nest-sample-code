/**
 * overview-controller
*/
import { Controller, Get } from '@nestjs/common';

@Controller('player')
export class PlayerController {
  @Get('/player_list')
  getPlayerList(): string[] {
    return ['James', 'Durant', 'Kyrie', 'Curry']
  }
}