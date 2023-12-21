import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}
  getUserList(): Promise<User[]> {
    return this.user.find();
  }
  createUser(user: UserDto) {
    console.log('user:', user);
    this.user.save(user);
  }
}
