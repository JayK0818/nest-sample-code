import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { tap } from 'rxjs';
import type { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
      tap(console.log),
    );
  }
}
