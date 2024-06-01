import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

interface UserProps {
  username: string
  password: string
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
  async createUser(user: UserProps) {
    try {
      const is_user_exist = await this.userRepository.findOneBy({
        username: user.username,
      })
      if (is_user_exist) {
        throw new HttpException(`username ${user.username} is exist`, HttpStatus.CREATED)
      }
      await this.userRepository.save(user)
    } catch (err) {
      console.log('err:', err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}