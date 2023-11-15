import { Controller, Get } from '@nestjs/common'
import { AuthorService } from './author.service'
import { BookService } from '../book/book.service'
import { MenuService } from '../menu/menu.service'

@Controller('author')
export class AuthController {
  constructor(
    private authService: AuthorService,
    private bookService: BookService,
    private menuService: MenuService
  ) {}
  @Get('auth_list')
  authorList () {
    return this.authService.getAllAuthorList()
  }
  @Get('book_list')
  bookList () {
    const book_list = this.bookService.getAllBooks()
    return [...book_list, 'React和Redux']
  }
  @Get('menu_list')
  menuList () {
    return this.menuService.getMenuList()
  }
}