import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entity/category.entity'
import { Question } from './entity/question.entity'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  async createQuestion({ title, text }: { title: string; text: string }) {
    console.log(title, text);
    return 'success';
  }
  async createCategory({ title }: { title: string }) {
    return 'success';
  }
}