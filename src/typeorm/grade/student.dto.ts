import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  grade_id: number;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}