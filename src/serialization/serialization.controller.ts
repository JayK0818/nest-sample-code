import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserProfileEntity } from './user.entity';

@Controller('serialization')
/**
 * 不知道为何 此demo无效
 */
@UseInterceptors(ClassSerializerInterceptor)
export class SerializationController {
  @Get('user/profile')
  // 未实现
  getUserProfile(): UserProfileEntity {
    return new UserProfileEntity({
      id: 1,
      firstName: 'Kamil',
      lastName: 'Mysliwiec',
      password: '1234567',
    });
  }
}
