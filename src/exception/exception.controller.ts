import { BadRequestException, UnauthorizedException, UseFilters, Controller, Get, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common'
// import { CustomUnAuthorizedException } from './custom-exception-filter'
import { HttpExceptionFilter } from './exception-filters'
import { AllExceptionsFilter } from './catch-everything-filter'

@Controller('exception')
export class ExceptionController {
  @Get('/phone_list')
  @UseFilters(new HttpExceptionFilter())
  getPhoneList () {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    // return ['华为', '小米', '苹果']
    // throw new HttpException('hello world', HttpStatus.FORBIDDEN)
/*     throw new HttpException({
      statusCode: HttpStatus.FORBIDDEN,
      message: 'hello world123'
    }, HttpStatus.UNAUTHORIZED) */
/*     try {
      const b = {}
      // @ts-ignore
      b.forEach(item => {
        console.log(item)
      })
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message'
      // @ts-ignore
      }, HttpStatus.FORBIDDEN, {
        cause: err
      })
    } */
    // @ts-ignore
/*     throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      message: '我是一条错误的消息',
      data: [],
      list: []
    }) */
    // 自定义
    // throw new CustomUnAuthorizedException()
    // 内置的 异常过滤器
    // throw new BadRequestException()
    // throw new UnauthorizedException()
    throw new ForbiddenException()
  }
  @Get('brand_list')
  @UseFilters(AllExceptionsFilter)
  getBrandList () {
    // @ts-ignore
    a = 123
    return [1, 2, 3]
  }
}