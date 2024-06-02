import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private props: any = {}
  constructor(props: any) {
    this.props = props
    console.log('props:', props)
  }
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || this.toValidate(metatype)) {
      return value
    }
    const object = plainToInstance(metatype, value)
    const errors = await validate(object, this.props)
    if (errors.length > 0) {
      const errString = errors.reduce((p, n) => p.concat(Object.values((n as any).constraints)), []).toString()
      throw new BadRequestException(errString);
    }
    return value
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return types.includes(metatype)
  }
}