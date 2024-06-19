import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entity/category.entity'
import { Question } from './entity/question.entity'

interface QuestionCategoryProps {
  question_id: number
  category_id_list: number[]
}

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  async createQuestion({ title, text }: { title: string; text: string }) {
    const isQuestionExist = await this.questionRepository.findOneBy({
      title,
    });
    if (isQuestionExist) {
      throw new HttpException(
        `问题 ${title} 已存在, 请勿重复创建`,
        HttpStatus.CONFLICT,
      );
    }
    const question = new Question();
    question.title = title;
    question.text = text;
    await this.questionRepository.save(question);
    return 'success';
  }
  async createCategory({ name }: { name: string }) {
    const isCategoryExist = await this.categoryRepository.findOneBy({
      name,
    });
    if (isCategoryExist) {
      throw new HttpException(
        `分类 ${name} 已存在, 请勿重复创建`,
        HttpStatus.CONFLICT,
      );
    }
    const category = new Category();
    category.name = name;
    await this.categoryRepository.save(category);
    return 'success';
  }
  async setQuestionCategory(data: QuestionCategoryProps) {
    const { question_id, category_id_list } = data
    const res = await this.questionRepository.findOne({
      where: {
        id: question_id
      },
      relations: ['categories']
    })
    console.log('问题存在吗?', res)
    if (!res) {
      throw new HttpException(`问题不存在或者已经删除`, HttpStatus.BAD_REQUEST)
    }
    for (const category_id of category_id_list) {
      const category = await this.categoryRepository.findOneBy({
        id: category_id
      })
      if (!category) {
        continue
      }
      res.categories.push(category)
    }
    await this.questionRepository.save(res)
    return 'success'
  }
  async getQuestionList() {
    const res = await this.questionRepository.find({
      relations: ['categories']
    })
    return res
  }
  async getCategoryQuestionList(categoryId: number) {
    const res = await this.categoryRepository.findOne({
      where: {
        id: categoryId
      },
      relations: ['questions']
    })
    return res
  }
}