/**
 * @description 数据转换interceptor
 */
import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs';
// import { Observable } from 'rxjs';

type Response<T = any> = {
  data: T;
};

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(map((data) => ({ data, message: 'success', code: 1 })));
  }
}
