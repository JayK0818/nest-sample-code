import {
  NestInterceptor,
  CallHandler,
  Injectable,
  ExecutionContext,
  BadGatewayException,
} from '@nestjs/common';
import { throwError, catchError, Observable, of, map } from 'rxjs';

@Injectable()
export class CatchErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /*     of(1, 2, 3, 4, 5)
      .pipe(
        map((n) => {
          if (n == 3) {
            throw 'three';
          }
          return n;
        }),
      )
      .subscribe({
        next: (v) => {
          console.log('next-value:', v);
        },
        error: (v) => {
          console.log('error', v);
        },
      }); */
    /*     of(1, 2, 3)
      .pipe(
        map((n) => {
          if (n === 2) {
            throw new Error('something went wrong');
          }
          return n;
        }),
      )
      .subscribe({
        next: (v) => {
          console.log(v);
        },
      }); */
    /*     of(1, 2, 3, 4, 5)
      .pipe(
        map((n) => {
          if (n === 3) {
            throw new Error('something went wrong');
          }
          return n;
        }),
        catchError(() => throwError(() => new BadGatewayException())),
      )
      .subscribe({
        next: (v) => {
          console.log(v);
        },
        error: (v) => {
          console.log('bad error11111:', JSON.stringify(v));
        },
      }); */
    /*     return next
      .handle()
      .pipe(catchError((err) => throwError(() => new BadGatewayException()))); */
    return next.handle().pipe(
      catchError(() => {
        return throwError(() => new BadGatewayException());
      }),
    );
  }
}
