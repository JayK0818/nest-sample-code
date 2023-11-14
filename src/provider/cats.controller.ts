import { CatsService } from './cats.service'
import { Controller, Get, Post, Body } from '@nestjs/common'

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get('cats_list')
  getCatsList () {
    return this.catsService.findAll()
  }
  @Post('create')
  createCat (@Body('name') name: string) {
    this.catsService.create(name)
  }
}