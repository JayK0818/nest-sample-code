import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotAcceptableException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: File, metadata: ArgumentMetadata) {
    const size = value.size;
    if (size > 10000) {
      throw new NotAcceptableException('文件太大');
    }
    return value;
  }
}
