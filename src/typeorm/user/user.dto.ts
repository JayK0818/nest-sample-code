import {
  IsNumberString,
  IsString,
  Length,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'
export class CreateUserDto {
  @IsString()
  @Length(6, 20, {
    message: (args) => {
      console.log(args)
      return '用户名不合法'
    }
  })
  username: string;

  @IsString()
  @Length(6, 20)
  password: string;
}

export class UpdateUserDot extends PartialType(CreateUserDto) {
  @IsNumberString()
  id: number
}

/**
 * @description 用户资料
*/
class UserProfileDto {
  @IsNumberString()
  age: number;

  @IsString()
  address: string;

  @IsString()
  school: string;
}
export class CreateUserProfileDto {
  @IsNumberString()
  id: number;

  @ValidateNested()
  @IsNotEmpty()
  profile_props: UserProfileDto;
}
