import { AuthController } from './author.controller'
import { AuthorService } from './author.service'
import { Module } from '@nestjs/common'
import { BookModule } from '../book/book.module'

@Module({
  imports: [BookModule],
  controllers: [AuthController],
  providers: [AuthorService]
})

export class AuthModule {}