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
```
