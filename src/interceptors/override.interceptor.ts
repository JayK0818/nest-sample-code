import {
  NestInterceptor,
  CallHandler,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    if (true) {
      return of([1, 2, 3]);
    }
    return next.handle();
  }
}
