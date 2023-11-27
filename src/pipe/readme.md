# Pipe

  A pipe is a class annotated with the **@Injectable()** decorator, which implements the **PipeTransform** interface.

  Pipes have two typical use cases:
1. transformation: transform input data to the desired form
2. validation: evaluate input data and if valid
  (管道通常有两个使用场景 1: 转换接受到的数据类型 比如将数字转换为字符串 2: 对数据验证是否合法)

  Nest interposes a pipe just before a method is invoked, and the pipe receives the arguments destined for the method and operates on them.
  Any transformation or validation operation takes place at that time.
  (Nest在方法调用之前插入 管道，并且接受函数的 参数进行操作。比如数据的验证或者转换)

## Built-in pipes

1. ValidationPipe
2. ParseIntPipe
3. ParseFloatPipe
4. ParseBoolPipe
5. ParseArrayPipe
6. ParseUUIDPipe
7. DefaultValuePipe
8. ParseFilePipe

## Binding pipes

  ParseIntPipe ensures that a method handler parameter is converted to a JavaScript integer(or throws an exception if the conversion fails)
  (ParseIntPipe 确保将参数转化为一个数字 (或者抛出一个异常 如果转换错误的话))

  以下是一个Demo
```ts
// pipe.controller.ts
import { Controller, Get, Param } from '@nestjs/common'

const playerList = [
  { id: 1, name: 'james', age: 39 },
  { id: 2, name: 'curry', age: 35 },
  { id: 3, name: 'durant', age: 36 }
]

@Controller('pipe')
export class PipeController {
  // 未使用内置管道对参数进行转换 (无法匹配到数据)
  @Get('/player/:id')
  findPlayer (@Param('id') id: string) {
    console.log(id, typeof id) // 1 sting
    return playerList.find(p => p.id === id)
  }
  // 使用ParseIntPipe
  findPlayer(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id)  // 1 number
    return playerList.find(p => p.id === id)
  }
  /**
   * 如果传递的 不是一个 可以转化为数字的字符串 会抛出异常
  *  {
      statusCode: 400,
      message: "Validation failed (numeric string is expected)",
      error: "Bad Request"
    }
  */
}
```
  The Exception will prevent the body of the **findPlayer()** method from executing. (异常将会阻止方法执行)

  除了直接传递一个 类, (将实例化和依赖注入交给框架 leaving responsibility for instantiation to the framework and enabling dependency injection)
  我们也可以传递一个实例。(Passing an in-place instance is useful if we want to customize the built-in pipe's behavior)

```ts
{
  @Get('player/:id')
  findPlayer(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return playerList.find(p => p.id === id)
  }
  @Get('player')
  queryPlayer(@Query('id', ParseIntPipe) id: number) {
    console.log(id, typeof id)
  }
}
```

## Custom pipes

  As mentioned, you can build your own custom pipes.
```ts
// validation.pipe.ts
import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform (value: any, metadata: ArgumentMetadata) {
    return value
  }
}
```
  PipeTransform<T, R> is a generic interface that must be implemented by any pipe, **T** to indicate the type of the input value, 
  **R** to indicate the return type of the **transform()** method.
  PipeTransform是一个泛型接口。 T 表示输入的 value 类型, R 表示经过transform() 方法转换后的类型。每个管道都必须实现 transform() 方法。

```ts
import { Controller, Query, Param, Body, Get } from '@nestjs/common'
import { CustomParseIntPipe } from './pipe.validation'

@Controller()
export class PipeController {
  @Get('/player/:id')
  findPlayer(@Param('id', CustomParseIntPipe) id: number) {
    /**
     * { metatype: [Function: Number], type: 'param', data: 'id' }
    */
  }
  @Get('/player')
  findPlayer(@Query('id', CustomParseIntPipe) id: number) {
    /**
     * { metatype: [Function: Number], type: 'query', data: 'id' }
    */
  }
  @Post('update')
  updatePlayer(@Body('id', CustomParseIntPipe) id: number) {
    /**
     * { metatype: [Function: Number], type: 'body', data: 'id' }
    */
  }
}
```
### transform

  transform() 方法 接受两个参数
1. value
  The value parameter is the currently processed method argument (before it is received by the route handling method)
2. metadata
  参数的metadata

```ts
{
  type: 'body' | 'query' | 'param' | 'custom',
  data?: string,
  metatype? Type<unknown>,
}
```
  type 表示获取参数使用的 装饰器的 类别, data 表示传递给 装饰器里的 字符串。metadata 表示在路由方法 标注的 参数类型。比如: String (如果省略了
  参数类型 或者 使用的是 JavaScript, metadata为 undefined)。

## Schema based validation

  We want to ensure that any incoming request to the create method contains a valid body (确保请求传递过来的参数是一个合法的对象)

  以下是官网的一个例子, 使用zod 验证参数
```ts
// pipe.validation.ts
import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common'
import { ZodObject } from 'zod'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}
  transform (value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value)
    } catch (err) {
      throw new BadRequestException('validation failed')
    }
    return value
  }
}

// player.dot.ts
import { z } from 'zod'
const createPlayerSchema = z.object({
  name: z.string(),
  age: z.number()
  team: z.string()
}).required()

type CreatePlayerDto = z.infer<typeof createPlayerSchema>

// pipe.controller.ts
@Post()
/**
 * 1. create an instance of the ZodValidationPipe
 * 2. Pass the context-specific Zod schema in the class constructor of the pipe
 * 3. Bind the pipe to the method
*/
@UsePipes(new ZodValidationPipe(createPlayerSchema))
createPlayer (@Body() player: CreatePlayerDto) {
}
```