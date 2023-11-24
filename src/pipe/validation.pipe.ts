/**
 * @description 自定义pipe
*/
import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform (value: any, metadata: ArgumentMetadata) {
    console.log('metadata:', metadata)
    return value
  }
}