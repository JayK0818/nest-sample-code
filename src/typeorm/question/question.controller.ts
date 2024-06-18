import { Body, Controller, Post } from "@nestjs/common";
import { QuestionService } from './question.service'
import { CreateQuestionDto, CreateCategoryDto } from './question.dto';

@Controller('typeorm/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post('create_question')
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }
  @Post('create_category')
  createCategory(@Body() createCateogryDto: CreateCategoryDto) {
    return this.questionService.createCategory(createCateogryDto)
  }
}