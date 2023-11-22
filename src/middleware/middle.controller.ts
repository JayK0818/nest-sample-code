import { Controller, Get } from '@nestjs/common'

@Controller('middleware')
export class MiddlewareController {
  @Get('logger')
  handleLogger () {
    return 'logger'
  }
  @Get('login')
  handleLogin () {
    return '登录...'
  }
  @Get('without-middleware')
  handleGet () {
    return 'without-middleware'
  }
}