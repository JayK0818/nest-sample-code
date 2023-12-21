import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/orm/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  async createUser(@Body() data: UserDto) {
    try {
      const res = await this.userService.createUser(data);
      console.log('res:', res);
      return {
        msg: 'success',
        code: 0,
      };
    } catch (err) {
      console.log('err:', err);
    }
  }
  @Get('user_list')
  getUserList() {
    return this.userService.getUserList();
  }
}
