import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { CreatePlayerDto, User } from './player.dto';

@Controller('validation')
export class ValidationController {
  @Post('/create')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  createPlayer(
    @Body()
    data: {
      list: Array<any>;
    },
  ) {
    console.log('data', data, data.list, typeof data.list);
    return '创建成功';
  }
  @Post('/create/bulk')
  createBulk(
    @Body(
      'list',
      new ParseArrayPipe({ items: CreatePlayerDto, separator: ',' }),
    )
    data: any,
  ) {
    console.log('data-array:', data, Array.isArray(data), typeof data);
    return '批量创建';
  }
  @Get('/:id')
  getPlayer(@Param('id', ParseIntPipe) data: number) {
    console.log(typeof data, data);
    return 'success';
  }
  @Post('post')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() data: CreatePlayerDto) {
    console.log('data:', data);
    return 'hello world';
  }
}
