import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { UserProfile } from './user-profille.entity'
import { UserService } from './user.service'
// 这个案例是 一对一
@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}