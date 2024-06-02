import { Controller, Body, Post, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDot } from './user.dto';

@Controller('typeorm')
export class UserController {
  constructor(readonly userService: UserService) { }
  @Post('user/register')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user)
  }
  @Post('user/update')
  updateUser(@Body() user: UpdateUserDot) {
    console.log('update-user:', user)
    return this.userService.updateUser(user)
  }
  @Post('user/remove')
  removeUser(@Body('id', ParseIntPipe) id: number) {
    console.log('id:', id, typeof id)
    return this.userService.removeUser(id)
  }
}