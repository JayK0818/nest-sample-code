/**
 * overview-controller
*/
import { Controller, Get, Res, Req, HttpCode, Header, Redirect, Param, Post, Body, Query } from '@nestjs/common';
import type { Response, Request } from 'express';
import { CreatePlayerDto } from './create-player.dto'

@Controller('player')
export class PlayerController {
  @Get('/player_list')
  @Header('Cache-Control', 'none')
  @HttpCode(200)
  getPlayerList(): string[] {
    return ['James', 'Durant', 'Kyrie', 'Curry']
  }
  @Get('/players_list')
  getPlayersList(@Res({ passthrough: true }) res: Response): any {
    // 如果使用了 @Res()/@Next() 无法直接返回值, 需要给装饰器@Res() 传递属性 passthrough: true 
    return ['James', 'Durant', 'Kyrie', 'Curry', '1']
    return JSON.stringify(['James', 'Durant', 'Kyrie', 'Curry', '1'])
/*     return res.json({ code: 0, data: ['James', 'Durant', 'Kyrie', 'Curry', '1'] }) */
  }
  // ------------------ request object ----------
  @Get('/coach')
  getCatsList (@Req() request: Request) {
    console.log('request', request)
    return 'hello world'
  }
  // --------------------- redirect ---------------
  @Get('website')
  @Redirect('https://www.baidu.com', 302)
  getPlayerWebsite() {
  }
  @Get('/age/:age')
  findOldest(@Param('age') age: string) {
    console.log('age', age, typeof age)
    return '年龄最大的'
  }
  // ------------- @Body() ----------------
  @Post('/create')
  createPlayer (@Body() createPlayer: CreatePlayerDto) {
    console.log('player props:', createPlayer)
    return 'success'
  }
  // -------------- @Query() ------------
  @Get('/sort')
  sortPlayerList (@Query() query: any) {
    console.log('query', query) //{ type: '1' } 访问路径为 xxx/sort?type=1
    return '排序成功'
  }
  // ---------------- @Param() ---------------
  @Get(':id')
  findPlayer (@Param() params: any) {
    console.log('params:', params)  // params: { id: '1' }
    return '动态路由参数查询'
  }
}