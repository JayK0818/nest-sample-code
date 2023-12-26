import {
  Controller,
  Get,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
// import { LoggingInterceptor } from './login.interceptor';
import { TransformInterceptor } from './transform.interceptor';

// @UseInterceptors(LoggingInterceptor)
@Controller('interceptor')
export class InterceptorController {
  @Get('login')
  handleLogin() {
    return '登录成功';
  }
  @Get('logout')
  handleLogOut() {
    throw new UnauthorizedException();
  }
  @UseInterceptors(TransformInterceptor)
  @Get('user-list')
  getUserList() {
    return ['kyrie', 'irving'];
  }
}
