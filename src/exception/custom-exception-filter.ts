import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomUnAuthorizedException extends HttpException {
  constructor() {
    super('你还没有获得足够权限哦', HttpStatus.UNAUTHORIZED);
  }
}
