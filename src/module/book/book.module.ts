import { Module } from '@nestjs/common'
import { BookService } from './book.service'
import { BookController } from './book.controller'

@Module({
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService] // 导出bookService 以便其他module可以使用
})

export class BookModule {}