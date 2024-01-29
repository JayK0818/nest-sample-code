import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';

@Injectable()
export class CreatePlayerValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value：', value);
    return value;
  }
}
