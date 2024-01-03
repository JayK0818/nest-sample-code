import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserList() {
    return ['张三', '李四', '王五'];
  }
}
