import { Module } from '@nestjs/common'
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity'
import { Question } from './entity/question.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Question])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}