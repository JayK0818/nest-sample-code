import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class OrmService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  getUserList(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
