import { Controller, Get } from '@nestjs/common'
import { BookService } from './book.service'

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get('book_list')
  getBookList () {
    return this.bookService.getAllBooks()
  }
}