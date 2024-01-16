import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('session')
export class SessionController {
  @Get('view')
  handleView() {
    return '访问成功';
  }
  @Get('visit')
  handleVisit(@Req() request: Request) {
    // @ts-ignore
    request.session.visits = request.session.visits
      ? // @ts-ignore
        request.session.visits + 1
      : 1;
    console.log(request.session);
    return '123';
  }
}
