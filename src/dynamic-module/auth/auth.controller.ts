import { Controller, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('dynamic-module')
export class AuthController {
  constructor(private userService: UserService) {}
  @Get('auth-list')
  getAuthList() {
    return this.userService.getUserList();
  }
}
