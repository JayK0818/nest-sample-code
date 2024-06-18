import { IsString, IsNotEmpty } from 'class-validator'

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
  title: string
}