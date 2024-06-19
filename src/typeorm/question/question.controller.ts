import { Body, Controller, Post, Get } from '@nestjs/common';
import { QuestionService } from './question.service'
import {
  CreateQuestionDto,
  CreateCategoryDto,
  SetQuestionCategoryDto,
} from './question.dto';

@Controller('typeorm/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post('create_question')
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }
  @Post('create_category')
  createCategory(@Body() createCateogryDto: CreateCategoryDto) {
    return this.questionService.createCategory(createCateogryDto);
  }
  @Post('set_question_category')
  setQuestionCategory(@Body() setProps: SetQuestionCategoryDto) {
    return this.questionService.setQuestionCategory(setProps)
  }
  @Get('question_list')
  getQuestionList() {
    return this.questionService.getQuestionList()
  }
  @Post('get_category_with_question_list')
  getCategoryWithQuestionList(@Body('id') id: number) {
    return this.questionService.getCategoryQuestionList(id)
  }
} 