import { Injectable } from '@nestjs/common'

@Injectable()
export class BookService {
  getAllBooks (): string[] {
    return ['你不知道的JavaScript', '深入浅出Node.js', 'React实战']
  }
}