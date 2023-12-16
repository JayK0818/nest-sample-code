# Mongo

安装 mongoose (The most pupulat MongoDB object modeling tool)

```js
npm install @nestjs/mongoose mongoose --save
```

下载后 可以在项目入口文件使用 **MongooseModule**

```ts
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
@Module({
  imports: [
    /**
     * The forRoot method accepts the same configuration object as
     * mongoose.connect() from the Mongoose package
     * */
    MongooseModule.forRoot('http://wwww.xxxx.com/database')
    //multiple database
    MongooseModule.forRoot('mongodb://localhost/test', {
      connectionName: 'cats'
    }),
    MongooseModule.forRoot('mongodb://localhost/users', {
      connectionName: 'users'
    })
    // async configuration
    MongooseModule.forRootAsync({
      useFactory: () => ({
        url: 'mongodb://localhost:27017/test'
      })
    })
  ]
})
```

With **Mongoose**, everything is derived from a Schema. Each schema maps to a MongoDB collection and defines
the shape of the documents within that collection.

1. 使用 @nestjs/mongoose 定义 Schema

```ts
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema() // schema marks a class as a schema definition
export class Cat {
  @Prop() // define a property in the document
  name: string;
  @Prop({ required: true })
  age: number;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
```

2. 不使用装饰器 手动定义一个 schema

```ts
import * as mongoose from 'mongoose';
export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
```

```ts
// cat.module.ts
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CatSchema, Cat } from './cat.schema'

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Cat.name,
      schema: CatSchema
    }
  ])]
})

// cat.service.ts
// 最后在 CatService中注入 Cat model 使用 @InjectModel()

import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cat } from './schema/cat.schema'

@Injectable()
export class CatService {
  /**
   * If you are just looking to inject the model from a named database
   * (从指定的数据库注入模型，传入第二个参数)
  */
  constructor(@InjectModel(Cat.name, 'cats') private catModel: Model<Cat>){}
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const d = new this.catModel(createdCatDto)
    return d.save()
  }
}
```

## Hooks

schema 层级的 hook(middleware), use the **forFeatureAsync()** method of the **MongooseModule** along
with a factory provider. With this technique, you can access a schema object, then use the **pre()**
or **post()** method to register a hook on that schema

```ts
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Cat.name,
        useFactory: () => {
          const schema = CatSchema
          // 该函数在存储执行之前，
          schema.pre('save', () => {
            console.log('hello before save')
          })
          return schema
        }
      }
    ])
  ]
})
```

## Async configuration

When you need to pass module options asynchronously instead of statically (当你需要动态而非静态给 module 传递 options 的时候)

1. use the **forFeatureAsync()** metho。

```ts
import { MongooseModule } from '@nestjs/mongoose';

MongooseModule.forRootAsync({
  useFactory: () => ({
    url: 'mongodb://localhost/test',
  }),
});
```

2. inject dependencies through **inject**

```ts
import { MongooseModule } from '@nestjs/mongoose';
MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
  }),
  inject: [ConfigService],
});
```
