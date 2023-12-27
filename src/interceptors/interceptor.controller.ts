import {
  Controller,
  Get,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
// import { LoggingInterceptor } from './login.interceptor';
import { TransformInterceptor } from './transform.interceptor';
import { CatchErrorInterceptor } from './catch.interceptor';
import { CacheInterceptor } from './override.interceptor';

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
  @UseInterceptors(CatchErrorInterceptor)
  @Get('phone-list')
  getPhoneList() {
    // console.log(a);
    return ['苹果', '华为'];
  }
  @Get('player-list')
  @UseInterceptors(CacheInterceptor)
  async getPlayerList() {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 5000);
    });
    return ['詹姆斯', '欧文'];
  }
}
