import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateLessonDto {
  @IsString()
  name: string

  @IsString()
  teacher: string
}

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  lesson_id: string;
}