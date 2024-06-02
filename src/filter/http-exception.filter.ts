import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus()
    console.log('exception:', exception);
    response.status(status).json({
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      message: exception.message
    })
/*     const status_code = exception.getStatus();
    const error_obj = {
      code: status_code,
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.path,
      data: request.body || request.query || request.params,
    };
    this.logger.error(error_obj, exception.stack);
    response.status(status_code).json(error_obj); */
  }
}
