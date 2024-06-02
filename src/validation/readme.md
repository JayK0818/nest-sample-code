# Validation

It is best practice to validate the correctness of any data sent into a web application.
(最佳实践是 验证每个请求数据的正确性)

1. ValidationPipe
2. ParseIntPipe
3. ParseBoolPipe
4. ParseArrayPipe
5. ParseUUIDPipe

The **ValidationPipe** provides a convenient approach to enforce validation rules for all
incoming client payloads.
(ValidationPipe 提供一个方便的方式强制对所有的请求携带的数据进行验证。)

## Auto-validation

We will start by binding **ValidationPipe** at the application level.
使用**ValidationPipe** 自动验证

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disabledErrorMessage: true, // 禁止返回参数验证失败的具体细节
      whitelist: true, // 接受到的参数的属性 不在DTO中, 该属性会自动移除
      /**
       * If our handler expects email and password properties, but a request also includes an age property,
       * this property can be automatically removed from the resulting DTO.
       */
      forbidNonWhitelisted: true, // 如果要禁止通过多传递了属性, 设置此属性为 true.
      transform: true, //automatically transform payloads to be objects typed according to their DTO classes.
    }),
  );
  app.listen(3000);
}
```

Error messages can be helpful to explain what was incorrect in a request, However, some
production environments prefer to disable detailed errors. (错误消息有助于解释请求中的错误, 然而在生产环境下更喜欢将错误消息隐藏)

ValidationPipe 自动验证的是对象。

```ts
@Controller()
export class CatsController {
  @Post()
  // 开启了validationPipe() 会验证接受的参数是否合法
  create(@Body() createUserDto: CreateUserDto) {}
}
```

When importing your DTOS, you can not use a type-only import as that would be earsed at runtime.
(导入 DTO 的时候 使用 **import { CreateUserDTO }** 而不是 **import type { CreateUserDTO }** )

```ts
// validation.ts
import { IsNumberString } from 'class-validator'
export class FindOneParams {
  @IsNumberString()
  id: number
}

// xxx.controller.ts

@Get('/:id')
findPlayer(@Param() data: FindOneParams) {
}
// 注意此处不要给 @Param() 传递参数@Param('id') FindOneParams验证的是一个对象
```

## Transform payload objects

Payloads coming in over the network are plain JavaScript objects. The **ValidationPipe** can automatically
transform playloads to the objects typed according to their DTO classes. 给 ValidationPipe 传递对象设置 **transform**
为 **true**.
(通过请求接受到的对象参数是一个纯 js 对象, 可以将其转换为 DTO class 的实例, 通过给 ValidationPipe 传递一个对象 设置 transform: true.)

```ts
// player.dto.ts
import { IsString } from 'class-validator';
export class CreateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  get fullName() {
    return `${this.firstName}_${this.lastName}`;
  }
}

// user.controller.ts
@Controller()
export class UserController {
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() user: CreateUserDTO) {
    const fullName = user.fullName;
  }
}
```

如果全局设置了 transform: true, 那么 有些基本数据类型也会自动转换.

```ts
{
  @Get('/:id')
  findPlayer(@Param('id') id: number) {
    console.log(id, typeof id) // 123  number
  }
}

// 也可以显式地使用 ParseIntPipe, ParseBoolPipe, ParseStringPipe
@Get(':id')
findOne(
  @Param('id', ParseIntPipe) id: number,
  @Query('sort', ParseBoolPipe) sort: boolean
) {
}


@Post()
findOne(@Body('id', ParseIntPipe) id: number) {
  
}
```

We specified the **id** type as a **number**, therefore, the **ValidationPipe** will try to automatically convert
a string identifier to a number.
(我们将 id 类型指定为 number 类型, 因此, ValidationPipe 将尝试自动转换为 number 类型)


// 未实现
1. Parsing and validating arrays
2. 解析嵌套的对象
## CustomValidator (class-validator)

```ts
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomTextLength implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text.length > 1 && text.length < 10;
  }
  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is too short or too long!';
  }
}
// Our class must implement **ValidatorConstraintInterface** interface and it's **validate** method.

// 使用
import { Validate } from 'class-validator'
export class createUserDto {
  @Validate(CustomTextLength, {
    message: 'Title is too short or long!'
  })
  title: string
}
```

## Validation messages

  You can specify validation message in the decorator options and that message will be returned in the
  **ValidationError** returned by the **validate** method
```ts
import { Length } from 'class-validator'

export class UserDto {
  @IsString()
  @Length(6, 20, {
    message: (args) => {
      console.log(args)
/**
 * {
    targetName: 'CreateUserDto',
    property: 'username',
    object: CreateUserDto { username: '', password: '111112233' },
    value: '',
    constraints: [ 6, 20 ]
  }
*/
      return '用户名不合法'
    }
  })
}
```

