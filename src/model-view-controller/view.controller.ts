import { Controller, Get, Render } from '@nestjs/common';

@Controller('views')
export class ViewController {
  @Get('player-list')
  @Render('index')
  getPlayerView() {
    return {
      player_list: [
        {
          firstName: 'kyrie',
          lastName: 'irving',
        },
        {
          firstName: 'lebron',
          lastName: 'james',
        },
        {
          firstName: 'kevin',
          lastName: 'durant',
        },
      ],
      message: 'hello world',
    };
  }
}
