import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profile: Repository<ProfileEntity>,
  ) {}
  getProfileList(): Promise<ProfileEntity[]> {
    return this.profile.find();
  }
}
