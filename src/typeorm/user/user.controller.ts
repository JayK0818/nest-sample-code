import { Controller, Body, Post, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDot, CreateUserProfileDto } from './user.dto';

@Controller('typeorm')
export class UserController {
  constructor(readonly userService: UserService) {}
  @Post('user/register')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
  @Post('user/update')
  updateUser(@Body() user: UpdateUserDot) {
    console.log('update-user:', user);
    return this.userService.updateUser(user);
  }
  @Post('user/remove')
  removeUser(@Body('id', ParseIntPipe) id: number) {
    console.log('id:', id, typeof id);
    return this.userService.removeUser(id);
  }
  @Post('user/set_profile')
  saveUserProfile(@Body() userProfile: CreateUserProfileDto) {
    const { id, profile_props } = userProfile;
    return this.userService.setProfile(id, profile_props)
  }
}