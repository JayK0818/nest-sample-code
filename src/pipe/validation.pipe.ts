/**
 * @description 自定义pipe
 */
import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodObject } from 'zod';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('metadata:', metadata);
    return value;
  }
}

// zod-validation
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('metadata', metadata);
    try {
      this.schema.parse(value);
    } catch (err) {
      console.log('err', err);
      throw new BadRequestException('validation failed');
    }
    console.log('value', value);
    return value;
  }
}

@Injectable()
export class CreatePlayerValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('metatype', metatype);
    if (!metatype || !this.toValidate(metatype)) {
      return false;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('validation failed');
    }
    return value;
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
