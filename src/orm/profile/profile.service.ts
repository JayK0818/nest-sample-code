import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profile: Repository<Profile>,
  ) {}
  getProfileList(): Promise<Profile[]> {
    return this.profile.find();
  }
}
