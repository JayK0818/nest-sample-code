import {
  IsNumber,
  IsString,
  Length,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'

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
  @IsNumber()
  id: number;
}

/**
 * @description 用户资料
*/
class UserProfileDto {
  @IsNumber()
  age: number;

  @IsString()
  address: string;

  @IsString()
  school: string;
}
export class CreateUserProfileDto {
  @IsNumber()
  id: number;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => UserProfileDto)
  profile_props: UserProfileDto;
}

// 保存用户同时保存用户资料
export class CreateUserWithProfileDto {
  @IsString()
  username: string

  @IsString()
  password: string

  @IsString()
  school: string

  @IsString()
  address: string

  @IsString()
  age: string
}