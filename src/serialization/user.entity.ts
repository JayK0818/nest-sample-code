import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';

export class UserProfileEntity {
  id: number;
  @Transform(({ value }) => value.toUpperCase())
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;
  @Expose()
  get fullName(): string {
    return this.firstName + this.lastName;
  }
  constructor(partial: Partial<UserProfileEntity>) {
    Object.assign(this, partial);
  }
}

const user = plainToInstance(UserProfileEntity, {
  id: 1,
  firstName: 'kyrie',
  lastName: 'irving',
  password: '1234',
});
console.log('user', user, user.fullName);
