import { Type } from 'class-transformer';
import {
  IsString,
  IsNumberString,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';

class User {
  @IsString()
  name: string;
}

export class CreatePlayerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumberString()
  age: number;

  /*   @ValidateNested({
    each: true,
  }) */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  list: User[];
  /*   @IsString()
  get fullName() {
    return `${this.firstName}_${this.lastName}`;
  } */
}

// export class UpdateUserDTO extends PartialType(CreatePlayerDto) {}

export class FindOneParams {
  @IsNumberString()
  id: number;
}

export { User };
