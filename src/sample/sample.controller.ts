import {
  Controller,
  Post,
  Body,
  UsePipes,
  ParseArrayPipe,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { CreatePlayerValidator } from './validator/create-player.validator';
import { CreatePlayerDecorator } from './decorator/index';
import * as argon from 'argon2';

@Controller('sample')
export class SampleController {
  @Post('create-player')
  // @UsePipes(new CreatePlayerValidator())x
  createPlayer(
    @CreatePlayerDecorator(
      new ValidationPipe({
        validateCustomDecorators: true,
        whitelist: true,
      }),
    )
    data: CreatePlayerDto,
  ) {
    console.log('player-data:', data);
    return 'hello';
  }
  @Get('argon')
  async handleSecret() {
    const password = await argon.hash('123456');
    const new_password = await argon.hash('123456');
    const secret_password = await argon.hash(
      'E10ADC3949BA59ABBE56E057F20F883E',
    );
    // 生成的两个密码不一样
    console.log(password, new_password);
    console.log(secret_password);
    const s1 = await argon.verify(
      '$argon2id$v=19$m=65536,t=3,p=4$nWsplovPRMcosoOStWKYtQ$WubV17xFwkayI2ZHTCzfBJf71oO1lj0vU7G/qc1TRk0',
      '123456',
    ); // true
    const s2 = await argon.verify(
      '$argon2id$v=19$m=65536,t=3,p=4$Y8EwLj9m2TRSEG9psH8mUg$yL+pHd/ZxACuwvK8uIF2Z32XGIyIgmZJO7Htp8NemMw',
      'E10ADC3949BA59ABBE56E057F20F883E',
    );
    console.log(s1, s2);
    return 'hello world';
  }
}

// $argon2id$v=19$m=65536,t=3,p=4$nWsplovPRMcosoOStWKYtQ$WubV17xFwkayI2ZHTCzfBJf71oO1lj0vU7G/qc1TRk0
// $argon2id$v=19$m=65536,t=3,p=4$Y8EwLj9m2TRSEG9psH8mUg$yL+pHd/ZxACuwvK8uIF2Z32XGIyIgmZJO7Htp8NemMw
