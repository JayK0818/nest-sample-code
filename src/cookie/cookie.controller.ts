import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('cookie')
export class CookieController {
  @Get('player-list')
  getPlayerList(@Req() request: Request) {
    console.log('cookies:', request.cookies); // { name: 'kyrie' }
    return ['kyrie', 'lebron'];
  }
  @Get('login')
  handleLogin(@Res({ passthrough: true }) response: Response) {
    response.cookie('name', 'kyrie');
    return '登录成功';
  }
}
