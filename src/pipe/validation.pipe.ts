/**
 * @description 自定义pipe
*/
import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { ZodObject } from 'zod'

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform (value: any, metadata: ArgumentMetadata) {
    console.log('metadata:', metadata)
    return value
  }
}

// zod-validation
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}
  transform (value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value)
    } catch (err) {
      console.log('err', err)
      throw new BadRequestException('validation failed')
    }
    console.log('value', value)
    return value
  }
}