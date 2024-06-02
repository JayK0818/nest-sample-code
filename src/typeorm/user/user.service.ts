import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

interface UserProps {
  username: string
  password: string
}

type UpdateUserProps = Partial<UserProps> & {
  id: number
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
  async createUser(user: UserProps) { // 创建用户
    try {
      const is_user_exist = await this.userRepository.findOneBy({
        username: user.username,
      });
      const res = await this.userRepository.find();
      console.log('res:', res);
      if (is_user_exist) {
        throw new HttpException(
          `username ${user.username} is exist`,
          HttpStatus.CREATED,
        );
      }
      await this.userRepository.save(user);
      return 'success';
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST, {
        cause: err,
      });
    }
  }
  async updateUser(user: UpdateUserProps) { // 更新用户
    try {
      const targetUser = await this.userRepository.findOneBy({ id: user.id })
      if (!targetUser) {
        throw new HttpException('用户不存在, 无法更新', HttpStatus.BAD_REQUEST)
      }
      if (user.password) {
        targetUser.password = user.password
      }
      if (user.username) {
        targetUser.username = user.username
      }
      await this.userRepository.save(targetUser)
      return 'update success'
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST, {
        cause: err
      })
    }
  }
  async removeUser(id: number) { // 删除用户
    try {
      const targetUser = await this.userRepository.findOneBy({ id })
      if (!targetUser) {
        throw new HttpException('用户不存在, 或已经被删除', HttpStatus.BAD_REQUEST)
      }
      await this.userRepository.remove(targetUser)
      return 'remove-success'
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST, {
        cause: err
      })
    }
  }
}