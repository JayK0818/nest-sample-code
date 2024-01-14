import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('cookie')
export class CookieController {
  @Get('player-list')
  getPlayerList(@Req() request: Request) {
    console.log('cookies:', request.cookies); // { name: 'kyrie' }
    console.log('cookies:', request.signedCookies); // { name: 'kyrie'}
    return ['kyrie', 'lebron'];
  }
  @Get('login')
  handleLogin(@Res({ passthrough: true }) response: Response) {
    /*     response.cookie('name', 'kyrie', {
      httpOnly: true,
      maxAge: 10000,
      secure: true,
      sameSite: 'none',
      encode: (v) => v.split('').reverse().join(),
    }); */
    response.cookie('name', 'kyrie', {
      signed: true,
    });
    return '登录成功';
  }
}
