import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscriber } from './user.subscriber';

@Module({
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
