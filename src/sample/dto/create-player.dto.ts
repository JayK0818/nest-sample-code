import { IsString, IsNotEmpty, IsArray, IsNumberString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsArray()
  ids: number[];
  // @IsNumberString()
  // id: string;
}
