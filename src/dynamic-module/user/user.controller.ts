import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('dynamic-module')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('user-list')
  getUserList() {
    return this.userService.getUserList();
  }
}
