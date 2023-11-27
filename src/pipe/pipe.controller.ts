import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, UsePipes } from '@nestjs/common'
import { CustomParseIntPipe, ZodValidationPipe } from './validation.pipe'
import { createPlayerSchema, createPlayerDto } from './create-player.dto'

class PlayerId {
  id: number
}

const playerList = [
  { id: 1, name: 'james', age: 39 },
  { id: 2, name: 'curry', age: 35 },
  { id: 3, name: 'durant', age: 36 }
]

@Controller('pipe')
export class PipeController {
  // @Get('/player/:id')
/*   findPlayer (@Param('id') id: string) {
    console.log('player_id', id, typeof id) // 1 sting
    // @ts-ignore
    return playerList.find(p => p.id === id)
  } */
  // ---------- 使用ParseIntPipe -----------
/*   findPlayer(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id) // 1  number
    return playerList.find(p => p.id === id)
  } */
  // -------------- 传递一个 实例对象 -------------
/*   findPlayer (@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return playerList.find(p => p.id === id)
  } */
/*   @Get('player')
  queryPlayer(@Query('id', ParseIntPipe) id: number) {
    console.log(id, typeof id) // 2 number
    return playerList.find(p => p.id === id)
  } */
  // ------------------- 使用自定义 pipe ----------------
  @Get('player')
  queryPlayer(@Query('id', CustomParseIntPipe) id) {
    return 'query'
  }
  @Post('player/update')
  updatePlayer(@Body('id', CustomParseIntPipe) id: number) {
    console.log(id, typeof id)
    return 'body'
  }
  @Get('player/:id')
  findPlayer(@Param('id', CustomParseIntPipe) id) {
    console.log(id, typeof id)  // 2  string
    /** 
     * 未添加 参数注解的类型 metatype 为 Object
     * { metatype: [Function: Object], type: 'param', data: 'id' }
     * 
    */
    return 'param'
  }
  @Post('create')
  @UsePipes(new ZodValidationPipe(createPlayerSchema))
  createPlayer (@Body() player: createPlayerDto) {
    console.log(player)
    return '创建成功'
  }
}