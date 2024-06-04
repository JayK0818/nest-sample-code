import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from './typeorm/validation.pipe'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './filter/http-exception.filter';
// import * as winston from 'winston';
// import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
// import { join } from 'path';
// cookie
// import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { join } from 'path';
import './typeorm/class-validator'

function createErrorString(errors: any[]) {
  const err = []
  const reserve_children = (list: any[] = []) => {
    for (const error of list) {
      if (error.constraints) {
        // @ts-ignore
        err.push(...Object.values((error as any).constraints));
      }
      if (error.children && error.children) {
        reserve_children(error.children)
      }
    }
  }
  reserve_children(errors)
  return err
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  /*   app.setGlobalPrefix('/api/v1', {
    exclude: ['views'],
  }); */
/*   app.useStaticAssets(join(__dirname, '..', 'public'));
  console.log(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs'); */
  app.setGlobalPrefix('/api/v1');
/*   app.use(
    session({
      secret: 'my-secret',
      cookie: {
        httpOnly: true,
        path: '/',
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
      },
      resave: true,
      name: 'kyrie',
      rolling: true,
    }),
  ); */
  // app.use(cookieParser('hello world'));
  /*   app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  }); */
  /*   app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  }); */
  /*   app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Custom-Header',
  }); */
  /*   app.enableVersioning({
    type: VersioningType.MEDIA_TYPE,
    key: 'v=',
  }); */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      validateCustomDecorators: true,
      validationError: {
        target: false,
        value: false
      },
      exceptionFactory: (errors: any) => {
        const errorList: string[] = createErrorString(errors)
        console.log('errorList:', errorList);
        throw new HttpException(errorList.join(''), HttpStatus.BAD_REQUEST)
      }
      // stopAtFirstError: true, //如果一个参数不符合多条验证规则, 默认会返回每条规则验证错误的提示, 设置为true, 只返回一条错误验证消息
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(
  //   new HttpExceptionFilter(
  //     WinstonModule.createLogger({
  //       transports: [
  //         new winston.transports.File({
  //           filename: 'log.txt',
  //           level: 'error',
  //           format: winston.format.combine(
  //             winston.format.json(),
  //             winston.format.timestamp(),
  //           ),
  //         }),
  //         new winston.transports.DailyRotateFile({
  //           // dirname: 'logs',
  //           filename: join(__dirname, '../logs', 'application-%DATE%.log'),
  //           datePattern: 'YYYY-MM-DD-HH',
  //           zippedArchive: false,
  //           maxSize: '20m',
  //           maxFiles: '14d',
  //         }),
  //         /*           new winston.transports.Console({
  //           format: winston.format.combine(
  //             winston.format.json(),
  //             winston.format.timestamp(),
  //             winston.format.colorize(),
  //           ),
  //         }), */
  //       ],
  //     }),
  //   ),
  // );
  await app.listen(3000);
}
bootstrap();
