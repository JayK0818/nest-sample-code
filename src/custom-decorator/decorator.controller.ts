import { Controller, Get } from '@nestjs/common';
import { User, ExtraParameter } from './custom-decorator';
import { CustomParseIntPipe } from './parseIntPipe';

@Controller('custom-decorator')
export class CustomDecoratorController {
  @Get('user-list')
  getUserList(@User() user: string) {
    console.log('user:', user);
    return ['hello', 'world', '你好 世界'];
  }
  @Get('player-list')
  getPlayerList(@ExtraParameter('url') headers: any) {
    console.log(headers);
    return ['james', 'kyrie'];
  }
  @Get('player/:id')
  /*   findPlayer(@User(new CustomParseIntPipe()) user) {
    console.log(user);
    return 'kyrie';
  } */
  findPlayer(@ExtraParameter('url', new CustomParseIntPipe()) user) {
    console.log(user);
  }
}
