import { Controller, Body, Post, ParseIntPipe, Get } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDot,
  CreateUserProfileDto,
  CreateUserWithProfileDto,
} from './user.dto';

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
    return this.userService.setProfile(id, profile_props);
  }
  @Post('user/user_profile')
  getUserProfile(@Body('user_id') user_id: number) {
    return this.userService.getUserProfile(user_id);
  }
  @Get('/user/profile-list')
  getUserProfileList() {
    return this.userService.getUserProfileList();
  }
  // 双向绑定关系, 保存用户的同时保存 用户资料  (需要同时保存user和profile才可以)
  @Post('/user/create-user-with-profile')
  createUserWithProfile(@Body() createUserDto: CreateUserWithProfileDto) {
    console.log(createUserDto)
    return this.userService.createUserWithProfile(createUserDto)
  }
}