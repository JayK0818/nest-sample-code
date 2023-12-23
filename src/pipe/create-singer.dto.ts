import { IsString, IsInt } from 'class-validator';

export class CreateSingerDot {
  @IsString()
  name: string;
  @IsInt()
  age: number;
}
