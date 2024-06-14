import { Body, Controller, Post } from "@nestjs/common";
import { ClassService } from './class.service'
import { CreateClassDto } from './class.dto'

@Controller('typeorm/class')
export class ClassController {
  constructor(private classService: ClassService) {}
  @Post('create')
  createClass(@Body() createClassDto: CreateClassDto) {
    const { name } = createClassDto
    console.log('name')
    return 'success'
  }
}