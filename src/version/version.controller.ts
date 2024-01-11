import { Controller, Version, Get, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({
  path: 'version',
  // version: '1',
})
export class VersionController {
  @Get('user-list')
  getUserList() {
    return ['hello', 'world'];
  }
  @Version('3')
  @Get('user-list')
  getNextUserList() {
    return ['你好', '世界'];
  }
  // 以上为 uri version
  @Version(VERSION_NEUTRAL)
  @Get('phone-list')
  getPhoneList() {
    return ['华为', '苹果'];
  }
  @Version('3')
  @Get('player-list')
  getPlayerList() {
    return ['詹姆斯', '欧文'];
  }
}
