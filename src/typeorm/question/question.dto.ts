import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator'

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string
}

export class SetQuestionCategoryDto {
  @IsNumber()
  question_id: number

  @IsArray()
  category_id_list: number[]
}